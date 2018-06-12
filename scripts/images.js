const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const glob = require('glob');

const getFiles = (src, optimized ) => {
  return new Promise((resolve, reject) => {
    glob(path.join(src, '../content/posts/images/*.{jpg,jpeg,gif,png}'), (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  })
    .then(files => {
      if(!optimized) {
        return files.filter(file => file.indexOf('-optimized') === -1)
      } else {
        return files.filter(file => file.indexOf('-optimized') !== -1)
      }
    });
};

const writeFile = ({
  file,
  quality = 75,
  size = 1250,
}) => {
  const [name, extension] = file.split('/').pop().split('.');
  sharp.cache(false);
  const image = sharp(file);
  return image.metadata()
    .then(metadata => {
      const fileName = file.replace(`${name}.${extension}`, `${name}-optimized.${extension}`);
      let stream;
      if (metadata.width > size) {
        stream = image.resize(size).toFile(fileName);
      } else {
        stream = new Promise(resolve => {
          return image.toBuffer()
            .then(buffer => {
              fs.writeFile(fileName, buffer, 'binary', (err, data) => {
                resolve();
              });
            });

        });
      }
      return stream
        .then(() => {
          console.log(`Updated ${fileName}`);
        })
        .catch(err => {
          console.error(err);
        });
    })
};

getFiles(path.resolve('src'))
  .then(files => {
    return Promise.all(
      files
        .map(file => writeFile({
          file
        }))
    )
  })
  .then(() => {
    getFiles(path.resolve('src'), true)
      .then(files => {
        files.map(file => {
          new Promise(resolve => {
            fs.rename(file, file.replace('-optimized', ''), () => {
              resolve();
            })
          })
        })
      })
      
  });
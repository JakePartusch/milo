import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import LazyLoad from "react-lazyload";

const styles = theme => ({
  listItem: {
    margin: "0 0 .7em 0",
    transition: "height 1s",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0.1rem"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 0"
      }
    }
  },
  listLink: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    color: theme.navigator.colors.postsListItemLink,
    "@media (hover: hover)": {
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover,
        transform: "translateY(-4px)",
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        display: "flex"
      },
      display: "block",
      backgroundColor: "lightblue"
    }
  },
  listItemPointer: {
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    transition: "all .5s",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      maxWidth: "180px",
      maxHeight: "240px",
      "@media (hover: hover)": {
        "&:hover": {
          opacity: 0.2,
          color: "lightblue"
        }
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      transition: "all .3s",
      transitionTimingFunction: "ease",
      ".moving-featured &, .is-aside &": {
        maxWidth: "30px",
        maxHeight: "30px",
        margin: "0"
      }
    }
  },
  listItemText: {
    position: "absolute",
    top: "90px",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    "& h1": {
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: "-0.03em",
      margin: 0,
      fontSize: `${theme.navigator.sizes.postsListItemH1Font}em`,
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH1Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          fontSize: "1em",
          fontWeight: 400,
          margin: "0 0 0 1.5em"
        },
        textAlign: "center"
      }
    },
    "& h2": {
      lineHeight: 1.2,
      textAlign: "center",
      display: "block",
      fontSize: `${theme.navigator.sizes.postsListItemH2Font}em`,
      margin: ".3em 0 0 0",
      [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForM}em`
      },
      [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
        fontSize: `${theme.navigator.sizes.postsListItemH2Font *
          theme.navigator.sizes.fontIncraseForL}em`,
        ".moving-featured &, .is-aside &": {
          display: "none"
        }
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 .5em"
      }
    }
  },
  dim: {
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      opacity: 0.1
    }
  },
  hideText: {
    display: "none"
  },
  showText: {
    display: "block",
    [`@media (max-width: ${theme.mediaQueryTresholds.M}px)`]: {
      display: "none"
    }
  }
});

class ListItem extends React.Component {
  state = {
    hidden: false,
    hideText: true
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      const category = this.props.post.node.frontmatter.category;
      const categoryFilter = this.props.categoryFilter;

      if (categoryFilter === "all posts" && this.state.hidden) {
        this.setState({ hidden: false });
      } else if (category !== categoryFilter) {
        this.setState({ hidden: true });
      } else if (category === categoryFilter) {
        this.setState({ hidden: false });
      }
    }
  }

  myDate = (dateString) => {
    const dateObj = new Date(dateString);
    const dateToShow = `${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}/${dateObj.getUTCFullYear()}`;

    return dateToShow;
  };

  render() {
    const { classes, post, linkOnClick } = this.props;
    return (
      <li
        className={`${classes.listItem} ${post.node.frontmatter.category}`}
        style={{ display: `${this.state.hidden ? "none" : "block"}` }}
        key={post.node.fields.slug}
        onMouseOver={() => this.setState({hideText: false})}
        onMouseOut={() => this.setState({hideText: true})}
      >
        <Link
          activeClassName="active"
          className={classes.listLink}
          to={post.node.fields.slug}
          onClick={linkOnClick}
        >
          <div className={`${classes.listItemPointer} pointer ${!this.state.hideText ? classes.dim : ''}`}>
            <LazyLoad height={60} overflow={true} throttle={300} once={true} offset={100}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={post.node.fields.cover.children[0].resolutions.srcSetWebp}
                />
                <source srcSet={post.node.fields.cover.children[0].resolutions.srcSet} />
                <img src={post.node.fields.cover.children[0].resolutions.src} alt="" />
              </picture>
            </LazyLoad>
          </div>
          <div className={`${classes.listItemText} ${this.state.hideText ? classes.hideText : classes.showText}`} >
            <h1>{post.node.frontmatter.title}</h1>
            <h2>{this.myDate(post.node.frontmatter.date)}</h2>
          </div>
        </Link>
      </li>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired
};

export default injectSheet(styles)(ListItem);

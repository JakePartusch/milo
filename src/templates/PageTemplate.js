import React from "react";
import PropTypes from "prop-types";

import Main from "../components/Main/";
import Page from "../components/Page/";
import Footer from "../components/Footer/";

class PageTemplate extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Main>
        <Page page={data.page} />
        <Footer footnote={data.footnote} />
      </Main>
    );
  }
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default PageTemplate;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
    footnote: markdownRemark(id: { regex: "/footnote/" }) {
      id
      html
    }
  }
`;

/* import React from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "../../components";
import { selectDirectorySections } from "../../redux";

import "./Directory.scss";

const Directory = () => {
  const sections = useSelector((state) => selectDirectorySections(state));
  return (
    <div className="directory-menu">
      {sections.map((menuitem) => (
        <MenuItem key={menuitem.id} menuitem={menuitem} />
      ))}
    </div>
  );
};
export default Directory; */

// using connect

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { MenuItem } from "../../components";
import { selectDirectorySections } from "../../redux";

import "./Directory.scss";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map((menuitem) => (
        <MenuItem key={menuitem.id} menuitem={menuitem} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});
// const mapStateToProps = (state) => ({
//   sections: selectDirectorySections(state),
// });
export default connect(mapStateToProps)(Directory);

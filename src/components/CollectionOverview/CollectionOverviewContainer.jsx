import { connect } from "react-redux";
import { compose } from "redux";
import { selectCollectionsFetching } from "../../redux";
import Spinner from "../Spinner/Spinner";
import { CollectionOverview } from "./CollectionOverview";

const mapStateToProps = createStructuredSelector({
  loading: selectCollectionsFetching,
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  Spinner
)(CollectionOverview);

export default CollectionOverviewContainer;

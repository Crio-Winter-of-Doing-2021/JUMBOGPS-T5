import React, {useState} from "react";
import "./styles.css"
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import { getAsset, getAssetInfo, getAssets, loadAsset, setAssetInfo } from "../../../../../controller/reducer/asset";


const controlStyles = {
  padding: "10px",
  color: "white",
};

const AutoSearch = ({dispatch}) => {

  const assetInfo = useSelector(getAssetInfo);
  const assets = useSelector(getAssets);

  const assetOptions = assets.map(asset=>({
    label:`${asset.name} [${asset._id}]`,
    value:`${asset.name} [${asset._id}]`, 
    id:asset._id,
    name:asset.name
  }))

  const [item, setItem] = useState((assetInfo.id ? {
    label:`${assetInfo.name} [${assetInfo.id}]`,
    value:`${assetInfo.name} [${assetInfo.id}]`, 
    id:assetInfo.id,
    name:assetInfo.name
  } : null));



  return (
    <Select
      
      components={{
        Control: (props) => (
          <div style={controlStyles} className="bg-secondary">
            {<p>Select Asset</p>}
            <components.Control {...props} />
          </div>
        ),
      }}
      isSearchable
      options={assetOptions}
      value={item}
      onChange={(item) => {
        setItem(item);
        dispatch(setAssetInfo({id:item.id,name:item.name}))
        dispatch(loadAsset())
      }}
    />
  );
};

export default AutoSearch;

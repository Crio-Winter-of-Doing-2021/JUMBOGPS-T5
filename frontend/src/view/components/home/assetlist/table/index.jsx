import React from 'react';
import { useSelector } from "react-redux";
import {
  Table,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { getAssets } from "../../../../../controller/reducer/assets";
import { setAssetInfo } from "../../../../../controller/reducer/asset";
import Info from "../../widget/info";
import moment from 'moment';

const DataTable = ({onSelect}) => {
    const assets = useSelector(getAssets);

    const renderDetailsOverlay = (asset) => (
      <Popover className="popover">
        <Popover.Content>
          <Info asset={asset} minimal={true}/>
        </Popover.Content>
      </Popover>
    );

    return (
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Last Updated</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, id) => (
            <OverlayTrigger
              placement="bottom-end"
              delay={{ show: 500, hide: 100 }}
              overlay={renderDetailsOverlay(asset)}
              key={id}
            >
              <tr >
                <td>{id}</td>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.lat}</td>
                <td>{asset.lon}</td>
                <td>{moment.duration(moment().diff(asset.timestamp)).humanize()} ago</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => onSelect(asset._id,asset.name)}
                  >
                    Track
                  </Button>
                </td>
              </tr>
            </OverlayTrigger>
          ))}
        </tbody>
      </Table>
    )
}

export default DataTable;

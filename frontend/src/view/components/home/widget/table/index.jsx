import React from 'react';
import { useSelector } from "react-redux";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Popover,
} from "react-bootstrap";
import { getAssets, setAssetId, setAssetInfo } from "../../../../../controller/reducer/asset";
import Info from "../info";
import moment from 'moment';

const DataTable = ({dispatch}) => {
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
                    onClick={() => dispatch(setAssetInfo({id:asset._id,name:asset.name}))}
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

import moment from "moment";
import React from "react";
import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';
import { getAssets } from "../../../../../controller/reducer/assets";
import { getDeviceSize } from "../../../../../controller/reducer/ui";
import Info from "../../widget/info";

const DataTable = () => {
  const assets = useSelector(getAssets);
  const deviceSize = useSelector(getDeviceSize);

  const renderDetailsOverlay = (asset) => (
    <Popover className="popover">
      <Popover.Content>
        <Info asset={asset} minimal={true} />
      </Popover.Content>
    </Popover>
  );

  return (
    <Table striped bordered hover variant="light" size={deviceSize}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          {deviceSize!=="sm"  && <th>Latitude</th>}
          {deviceSize!=="sm"  && <th>Longitude</th>}
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
            <tr>
              <td>{id}</td>
              <td>{asset.name}</td>
              <td>{asset.type}</td>
               {deviceSize!=="sm" && <td>{asset.lat}</td>}
               {deviceSize!=="sm" && <td>{asset.lon}</td>}
              <td>
                {moment.duration(moment().diff(asset.timestamp)).humanize()} ago
              </td>
              <td>
                <Button
                  size={deviceSize}
                  variant="outline-primary"
                  smooth
                  as={HashLink}
                  to={`/track/${asset._id}#map`}
                >
                  Track
                </Button>
              </td>
            </tr>
          </OverlayTrigger>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;

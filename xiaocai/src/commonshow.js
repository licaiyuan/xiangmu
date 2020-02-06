import React from "react";
import { Input, Select, Row, Col, Form, Icon, Button, Checkbox, Pagination } from "antd";
export function Fyzj(props) {
    return (
      <Pagination defaultCurrent={1} total={props.sl} className="lbfy" />
    )
  }
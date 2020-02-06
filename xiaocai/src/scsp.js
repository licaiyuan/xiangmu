import React from "react";
import "./scsp.scss";
import { Form, Icon, Input, Button, Upload, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";
const { TextArea } = Input;
const Component = React.Component;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
function beforeUpload() {
  return false
  // return true
}
class scsp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
      zsscddx:'',//上传的所有数据
      scdtpurl:'',//上传的照片
    };
  }
  handleChange = info => {
    console.log(info.file)

  };
  //简介改变值
  srbh = (e) => {
    let value = e;
    console.log(value)
  }
  scspzp = () => {
    console.log('ks')
    console.log(this.state.loading)
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let param = new FormData()
        // console.log(values.sp.file)
        // console.log(values.sp.file.name)
        // let wzcs = {
        //   jj: values.username,
        //   spmz: values.sp.file.name,
        //   tpmz: values.zp.file.name
        // }
        let crsz = [
          {
            title: 'title',
            Content: values.title
          },
          {
            title: 'jj',
            Content: values.username
          },
          {
            title: 'spmz',
            Content: values.sp.file.name
          },
          {
            title: 'zpmz',
            Content: values.zp.file.name
          },
          {
            title: 'sp',
            Content: values.sp.file
          },
          {
            title: 'sp',
            Content: values.zp.file
          },]
        crsz.forEach(item => {
          param.append(item.title, item.Content);
        })

        let config = {
          headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
        };
        const _this = this
        this.setState({zsscddx:param})
        this.setState({scdtpurl:values.zp.file.name})
        // axios.post(`${this.props.qqip}/upload/image`, param, config).then(res => {
        //   let { status } = res
        //   status == 200 ? message.success('上傳成功') : message.error('上傳失敗');
        //   _this.setState({ imageUrl: `${this.props.qqip}/upload/${values.zp.file.name}` });
        //   // _this.state.imageUrl = `${this.props.qqip}/upload/${values.zp.file.name}`


        // })


      }
    });
  };
  //正式上传
  zssc=()=>{
    let config = {
      headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
    };
    console.log(this.state.zsscddx)
    const _this = this
    axios.post(`${this.props.qqip}/upload/image`, this.state.zsscddx, config).then(res => {
      let { status } = res
      status == 200 ? message.success('上傳成功') : message.error('上傳失敗');
      _this.setState({ imageUrl: `${this.props.qqip}/upload/${this.state.scdtpurl}` });
      // _this.state.imageUrl = `${this.props.qqip}/upload/${values.zp.file.name}`


    })

  }
  componentDidMount() { }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const uploadButton = (
      <div>

        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const propx = {
      action: `${this.props.qqip}/upload/image`,
      data: {
        jj: ''
      },
      listType: "text",
      className: "avatar-uploader",
      onChange({ file, fileList }) {
        // if (file.status !== 'uploading') {
        //   console.log(file)
        //   this.state.param.append('video', file);
        //   console.log(fileList)
        // }
      },
      beforeUpload() {
        return false
      },

    };
    const { imageUrl } = this.state;
    let actionUrl = `${this.props.qqip}/upload/image`
    return (
      <div>
        <Form layout="inline" className="szp" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("title")(
              <Input placeholder="标题" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("username")(
              <TextArea rows={4} placeholder="简介" maxLength={200} onPressEnter={this.srbh} />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("zp")(
              <Upload
                name="zp"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={actionUrl}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            )}

          </Form.Item>
          <Form.Item>
            {getFieldDecorator("sp")(
              <Upload {...propx}  >
                <Button>
                  <Icon type="upload" /> Upload
              </Button>
              </Upload>
            )}

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              上传
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={this.zssc}>正式上传</Button>
      </div>
    );
  }
}



const WrappedHorizontalLoginForm = Form.create({ name: 'scsp' })(scsp);
const stateToProps = state => {
  return {
    qqip: state.qqip
  };
};
const dispatchToProps = dispatch => {
  return {

  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(WrappedHorizontalLoginForm);
// export default WrappedHorizontalLoginForm;

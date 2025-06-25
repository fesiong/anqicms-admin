import NewContainer from '@/components/NewContainer';
import {
  changeAttachmentCategory,
  changeAttachmentName,
  deleteAttachment,
  getAttachmentCategories,
  getAttachments,
  scanUploadsAttachment,
  uploadAttachment,
} from '@/services/attachment';
import { calculateFileMd5, sizeFormat } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, injectIntl } from '@umijs/max';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Image,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { IntlShape } from 'react-intl';
import AttachmentCategory from './components/category';
import './index.less';

export type intlProps = {
  intl: IntlShape;
};

class ImageList extends React.Component<intlProps> {
  state: { [key: string]: any } = {
    images: [],
    fetched: false,
    total: 0,
    page: 1,
    limit: 18,
    selectedIds: [],
    addImageVisible: false,
    categories: [],
    categoryId: 0,
    tmpCategoryId: 0,
    currentAttach: {},
    detailVisible: false,
    editVisible: false,

    indeterminate: false,
    selectedAll: false,
    kw: '',
    newKey: '',
  };

  componentDidMount() {
    this.getImageList();
    this.getCategories();
  }

  onTabChange = (key: string) => {
    this.setState({
      fetched: false,
    });
    this.getImageList().then(() => {
      this.getCategories();
      this.setState({
        newKey: key,
      });
    });
  };

  getImageList = async () => {
    const { page, limit, categoryId, kw } = this.state;
    getAttachments({
      current: page,
      pageSize: limit,
      category_id: categoryId,
      q: kw,
    })
      .then((res) => {
        this.setState({
          images: res.data,
          total: res.total,
          fetched: true,
        });
      })
      .catch(() => {});
  };

  getCategories = () => {
    getAttachmentCategories().then((res) => {
      this.setState({
        categories: res.data || [],
      });
    });
  };

  scanUploadsDir = () => {
    Modal.confirm({
      title: this.props.intl.formatMessage({
        id: 'content.attachment.scan.confirm',
      }),
      content: this.props.intl.formatMessage({
        id: 'content.attachment.scan.content',
      }),
      onOk: async () => {
        scanUploadsAttachment({}).then((res) => {
          message.info(
            res.msg ||
              this.props.intl.formatMessage({
                id: 'content.attachment.scan.success',
              }),
          );
        });
      },
    });
  };

  handleUploadImage = async (e: any) => {
    // 上传前先计算MD5
    let hide = message.loading({
      content: this.props.intl.formatMessage({
        id: 'setting.system.submitting',
      }),
      duration: 0,
      key: 'uploading',
    });
    const { categoryId } = this.state;
    const size = e.file.size;
    const md5Value = await calculateFileMd5(e.file);
    const chunkSize = 2 * 1024 * 1024; // 每个分片大小 2MB
    const totalChunks = Math.ceil(size / chunkSize);
    let formData = new FormData();
    formData.append('category_id', categoryId + '');
    formData.append('file_name', e.file.name);
    formData.append('md5', md5Value as string);
    if (totalChunks > 1) {
      // 大于 chunkSize 的，使用分片上传
      formData.append('chunks', totalChunks + '');
      for (let i = 0; i < totalChunks; i++) {
        const chunk = e.file.slice(i * chunkSize, (i + 1) * chunkSize);
        chunk.name = e.file.name;
        chunk.uid = e.file.uid;
        formData.set('chunk', i + '');
        formData.set('file', chunk);
        try {
          const res = await uploadAttachment(formData);
          if (res.code !== 0) {
            message.info(res.msg);
            hide();
          } else {
            hide = message.loading({
              content:
                this.props.intl.formatMessage({
                  id: 'setting.system.submitting',
                }) +
                ' - ' +
                Math.ceil(((i + 1) * 100) / totalChunks) +
                '%',
              duration: 0,
              key: 'uploading',
            });
            if (res.data) {
              // 上传完成
              hide();
              message.info(
                res.msg ||
                  this.props.intl.formatMessage({
                    id: 'setting.system.upload-success',
                  }),
              );
              this.getImageList();
            }
          }
        } catch (err) {
          hide();
          message.info('upload failed');
        }
      }
    } else {
      // 小于 chunkSize 的，直接上传
      formData.append('file', e.file);
      uploadAttachment(formData)
        .then((res) => {
          if (res.code !== 0) {
            message.info(res.msg);
          } else {
            message.info(
              res.msg ||
                this.props.intl.formatMessage({
                  id: 'setting.system.upload-success',
                }),
            );
            this.getImageList();
          }
        })
        .finally(() => {
          hide();
        });
    }
  };

  handleDeleteImage = () => {
    Modal.confirm({
      title: this.props.intl.formatMessage({
        id: 'content.attachment.delete.image.confirm',
      }),
      content: this.props.intl.formatMessage({
        id: 'content.attachment.delete.content',
      }),
      onOk: async () => {
        const { selectedIds } = this.state;
        for (let id of selectedIds) {
          let res = await deleteAttachment({
            id: id,
          });
          message.info(res.msg);
        }
        this.setState({
          indeterminate: false,
          selectedAll: false,
          selectedIds: [],
        });
        this.hideAttachDetail();
        this.getImageList();
      },
    });
  };

  handleSearch = (kw: any) => {
    this.setState(
      {
        kw: kw,
        page: 1,

        indeterminate: false,
        selectedAll: false,
        selectedIds: [],
      },
      () => {
        this.getImageList();
      },
    );
  };

  onChangeSelect = (e: any) => {
    const { images } = this.state;
    this.setState({
      selectedIds: e,
      indeterminate:
        e.length === 0 ? false : e.length < images.length ? true : false,
      selectedAll: e.length === images.length ? true : false,
    });
  };

  onChangePage = (page: number, pageSize?: number) => {
    const { limit } = this.state;
    this.setState(
      {
        page: page,
        limit: pageSize ? pageSize : limit,
      },
      () => {
        this.getImageList();
      },
    );
  };

  handleChangeCategory = async (e: any) => {
    this.setState(
      {
        categoryId: e,
        page: 1,

        indeterminate: false,
        selectedAll: false,
        selectedIds: [],
      },
      () => {
        this.getImageList();
      },
    );
  };

  handleSetTmpCategoryId = (e: any) => {
    this.setState({
      tmpCategoryId: e,
    });
  };

  handleUpdateToCategory = async () => {
    const { tmpCategoryId, categories } = this.state;
    Modal.confirm({
      icon: null,
      title: this.props.intl.formatMessage({
        id: 'content.attachment.move-to-category',
      }),
      content: (
        <div>
          <Select
            defaultValue={tmpCategoryId}
            onChange={this.handleSetTmpCategoryId}
            style={{ width: 200 }}
          >
            <Select.Option value={0}>
              {this.props.intl.formatMessage({
                id: 'content.attachment.unclassified',
              })}
            </Select.Option>
            {categories.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
      onOk: () => {
        let { selectedIds, tmpCategoryId } = this.state;
        changeAttachmentCategory({
          category_id: tmpCategoryId,
          ids: selectedIds,
        }).then((res) => {
          message.info(res.msg);
          this.getImageList();
          this.setState({
            indeterminate: false,
            selectedAll: false,
            selectedIds: [],
          });
        });
      },
    });
  };

  handlePreview = (item: any) => {
    this.setState({
      currentAttach: item,
      detailVisible: true,
    });
  };

  hideAttachDetail = () => {
    this.setState({
      detailVisible: false,
    });
  };

  handleModifyName = () => {
    this.setState({
      editVisible: true,
    });
  };

  changeModifyName = (mode: any) => {
    this.setState({
      editVisible: mode,
    });
  };

  onSubmitEdit = async (values: any) => {
    const { currentAttach } = this.state;
    currentAttach.file_name = values.file_name;
    changeAttachmentName(currentAttach).then((res) => {
      if (res.code !== 0) {
        message.info(res.msg);
      } else {
        message.info(
          res.msg ||
            this.props.intl.formatMessage({
              id: 'content.attachment.edit.success',
            }),
        );
        this.setState({
          currentAttach: currentAttach,
        });
        this.getImageList();
      }
    });
    this.changeModifyName(false);
  };

  handleRemoveAttach = () => {
    const { currentAttach } = this.state;
    Modal.confirm({
      title: this.props.intl.formatMessage({
        id: 'content.attachment.delete.confirm',
      }),
      onOk: () => {
        this.setState(
          {
            selectedIds: [currentAttach.id],
          },
          () => {
            this.handleDeleteImage();
          },
        );
      },
    });
  };

  handleReplaceAttach = (e: any) => {
    let { currentAttach } = this.state;
    let formData = new FormData();
    formData.append('file', e.file);
    formData.append('replace', 'true');
    formData.append('id', currentAttach.id);
    uploadAttachment(formData).then((res) => {
      if (res.code !== 0) {
        message.info(res.msg);
      } else {
        message.info(
          res.msg ||
            this.props.intl.formatMessage({
              id: 'content.attachment.replace.success',
            }),
        );
        this.setState({
          currentAttach: Object.assign(currentAttach, res.data || {}),
        });
        this.getImageList();
      }
    });
  };

  onCheckAllChange = (e: any) => {
    if (e.target.checked) {
      const { images } = this.state;
      let result = [];
      for (let item of images) {
        result.push(item.id);
      }
      this.setState({
        selectedIds: result,
        indeterminate: false,
        selectedAll: true,
      });
    } else {
      this.setState({
        selectedIds: [],
        indeterminate: false,
        selectedAll: false,
      });
    }
  };

  render() {
    const {
      images,
      total,
      limit,
      categories,
      categoryId,
      fetched,
      selectedIds,
      currentAttach,
      detailVisible,
      editVisible,
      indeterminate,
      selectedAll,
      newKey,
    } = this.state;

    return (
      <NewContainer onTabChange={(key) => this.onTabChange(key)}>
        <Card
          key={newKey}
          className="image-page"
          title={this.props.intl.formatMessage({
            id: 'menu.archive.attachment',
          })}
          extra={
            <div className="meta">
              <Space size={16}>
                {selectedIds.length > 0 && (
                  <>
                    <Button
                      className="btn-gray"
                      onClick={this.handleUpdateToCategory}
                    >
                      <FormattedMessage id="content.attachment.move-to-category" />
                    </Button>
                    <Button
                      className="btn-gray"
                      onClick={this.handleDeleteImage}
                    >
                      <FormattedMessage id="content.attachment.batch-delete" />
                    </Button>
                  </>
                )}
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={this.onCheckAllChange}
                  checked={selectedAll}
                >
                  <FormattedMessage id="content.attachment.select-all" />
                </Checkbox>
                <span>
                  <FormattedMessage id="content.attachment.filter" />
                </span>
                <Input.Search
                  placeholder={this.props.intl.formatMessage({
                    id: 'content.attachment.search',
                  })}
                  onSearch={this.handleSearch}
                />
                <Select
                  defaultValue={categoryId}
                  style={{ width: 120 }}
                  onChange={this.handleChangeCategory}
                >
                  <Select.Option value={0}>
                    <FormattedMessage id="content.attachment.all-source" />
                  </Select.Option>
                  {categories.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
                <AttachmentCategory
                  onCancel={() => {
                    this.getCategories();
                  }}
                >
                  <Button
                    key="category"
                    onClick={() => {
                      //todo
                    }}
                  >
                    <FormattedMessage id="content.attachment.category.manage" />
                  </Button>
                </AttachmentCategory>
                <Upload
                  name="file"
                  multiple
                  showUploadList={false}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.webm,.mp4,.mp3,.zip,.rar,.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt"
                  customRequest={this.handleUploadImage}
                >
                  <Button type="primary">
                    <FormattedMessage id="content.attachment.upload" />
                  </Button>
                </Upload>
                <Button onClick={() => this.scanUploadsDir()}>
                  <FormattedMessage id="content.attachment.scan.name" />
                </Button>
              </Space>
            </div>
          }
        >
          <div className="body">
            <Checkbox.Group
              onChange={this.onChangeSelect}
              value={selectedIds}
              style={{ display: 'block' }}
            >
              {!fetched ? (
                <Empty
                  className="empty-normal"
                  image={<LoadingOutlined style={{ fontSize: '72px' }} />}
                  description={this.props.intl.formatMessage({
                    id: 'content.attachment.loading',
                  })}
                ></Empty>
              ) : total > 0 ? (
                <Row gutter={[16, 16]} className="image-list">
                  {images?.map((item: any) => (
                    <Col sm={4} xs={12} key={item.id}>
                      <div className="image-item">
                        <div className="inner">
                          <Checkbox className="checkbox" value={item.id} />
                          <div
                            className="link"
                            onClick={this.handlePreview.bind(this, item)}
                          >
                            {item.thumb ? (
                              <Image
                                className="img"
                                preview={false}
                                src={item.thumb + '?t=' + item.updated_time}
                                alt={item.file_name}
                              />
                            ) : (
                              <Avatar className="default-img" size={120}>
                                {item.file_location.substring(
                                  item.file_location.lastIndexOf('.'),
                                )}
                              </Avatar>
                            )}
                          </div>
                          <div className="info">
                            <div>{item.file_name}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty
                  className="empty-normal"
                  description={this.props.intl.formatMessage({
                    id: 'content.attachment.empty',
                  })}
                >
                  <Upload
                    name="file"
                    showUploadList={false}
                    multiple={true}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.webm,.mp4,.mp3,.zip,.rar,.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt"
                    customRequest={this.handleUploadImage}
                  >
                    <Button type="primary">
                      <FormattedMessage id="content.attachment.upload" />
                    </Button>
                  </Upload>
                </Empty>
              )}
            </Checkbox.Group>
            {total > 0 && (
              <Pagination
                defaultCurrent={1}
                defaultPageSize={limit}
                total={total}
                showSizeChanger={true}
                showQuickJumper={true}
                onChange={this.onChangePage}
                style={{ marginTop: '20px' }}
              />
            )}
          </div>
        </Card>
        <Modal
          width={900}
          title={this.props.intl.formatMessage({
            id: 'content.attachment.detail',
          })}
          onCancel={this.hideAttachDetail}
          onOk={this.hideAttachDetail}
          open={detailVisible}
        >
          <div className="attachment-detail">
            <div className="preview">
              {currentAttach.thumb ? (
                <Image
                  width={'100%'}
                  className="img"
                  preview={{
                    src:
                      currentAttach.logo + '?t=' + currentAttach.updated_time,
                  }}
                  src={currentAttach.logo + '?t=' + currentAttach.updated_time}
                  alt={currentAttach.file_name}
                />
              ) : (
                <Avatar className="default-img" size={200}>
                  {currentAttach.file_location?.substring(
                    currentAttach.file_location?.lastIndexOf('.'),
                  )}
                </Avatar>
              )}
            </div>
            <div className="detail">
              <div className="info">
                <div className="item">
                  <div className="name">
                    <FormattedMessage id="content.attachment.alt" />:
                  </div>
                  <div className="value">{currentAttach.file_name}</div>
                </div>
                <div className="item">
                  <div className="name">
                    <FormattedMessage id="content.attachment.type" />:
                  </div>
                  <div className="value">
                    {currentAttach.file_location?.substring(
                      currentAttach.file_location?.lastIndexOf('.'),
                    )}
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <FormattedMessage id="content.attachment.upload-at" />:
                  </div>
                  <div className="value">
                    {dayjs(currentAttach.updated_time * 1000).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )}
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <FormattedMessage id="content.attachment.size" />:
                  </div>
                  <div className="value">
                    {sizeFormat(currentAttach.file_size)}
                  </div>
                </div>
                {currentAttach.width > 0 && (
                  <div className="item">
                    <div className="name">
                      <FormattedMessage id="content.attachment.ratio" />:
                    </div>
                    <div className="value">
                      {currentAttach.width + '×' + currentAttach.height}
                    </div>
                  </div>
                )}
                <div className="item">
                  <div className="name">
                    <FormattedMessage id="content.attachment.address" />:
                  </div>
                  <div className="value">{currentAttach.logo}</div>
                </div>
              </div>
              <Space size={16} align="center" className="btns">
                <Upload
                  name="file"
                  showUploadList={false}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.webm,.mp4,.mp3,.zip,.rar,.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt"
                  customRequest={this.handleReplaceAttach}
                >
                  <Button>
                    <FormattedMessage id="content.attachment.replace.name" />
                  </Button>
                </Upload>
                <Button onClick={this.handleModifyName}>
                  <FormattedMessage id="content.attachment.edit" />
                </Button>
                <Button onClick={this.handleRemoveAttach}>
                  <FormattedMessage id="setting.system.delete" />
                </Button>
                <Button danger onClick={this.hideAttachDetail}>
                  <FormattedMessage id="setting.action.close" />
                </Button>
              </Space>
              <div className="tips">
                <p>
                  <FormattedMessage id="content.attachment.explain" />:
                </p>
                <div>
                  <FormattedMessage id="content.attachment.explain.tips1" />
                </div>
                <div>
                  <FormattedMessage id="content.attachment.explain.tips2" />
                </div>
                <div>
                  <FormattedMessage id="content.attachment.explain.tips3" />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {editVisible && (
          <ModalForm
            width={600}
            title={this.props.intl.formatMessage({
              id: 'content.attachment.edit',
            })}
            open={editVisible}
            initialValues={currentAttach}
            layout="horizontal"
            onFinish={this.onSubmitEdit}
            onOpenChange={(e) => this.changeModifyName(e)}
          >
            <div className="mb-normal">
              <Alert
                message={this.props.intl.formatMessage({
                  id: 'content.attachment.alt.alert',
                })}
              />
            </div>
            <ProFormText name="file_name" />
          </ModalForm>
        )}
      </NewContainer>
    );
  }
}

export default injectIntl(ImageList);

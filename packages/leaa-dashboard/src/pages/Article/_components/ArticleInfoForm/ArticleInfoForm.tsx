import React from 'react';
import cx from 'classnames';
import { Col, Form, Input, Row } from 'antd';
import { withTranslation } from 'react-i18next';
import { FormComponentProps } from 'antd/lib/form';

import { Article } from '@leaa/common/entrys';
import { ITfn } from '@leaa/dashboard/interfaces';
import { SwitchNumber } from '@leaa/dashboard/components/SwitchNumber';
import { SelectCategoryIdByTree } from '@leaa/dashboard/components/SelectCategoryIdByTree';
import { FormCard } from '@leaa/dashboard/components/FormCard';

import style from './style.less';

interface IFormProps extends FormComponentProps {
  className?: string;
  item?: Article;
  loading?: boolean;
}

type IProps = IFormProps & ITfn;

class ArticleInfoFormInner extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { t } = this.props;

    const { props } = this;
    const { getFieldDecorator } = this.props.form;

    // title={t('_page:Article.Component.articleInfo')}
    return (
      <div className={cx(style['wrapper'], props.className)}>
        <FormCard>
          <Form className={cx('g-form--zero-margin-bottom', style['form-wrapper'])}>
            <Row gutter={16} className={style['form-row']}>
              <Col xs={24} sm={14}>
                <Form.Item label={t('_lang:title')}>
                  {getFieldDecorator('title', {
                    initialValue: props.item ? props.item.title : undefined,
                    rules: [{ required: true }],
                  })(<Input placeholder={t('_lang:title')} />)}
                </Form.Item>
              </Col>

              <Col xs={19} sm={6}>
                <Form.Item label={t('_lang:category')}>
                  {getFieldDecorator('category_id', {
                    initialValue: props.item ? props.item.category_id : undefined,
                    rules: [{ required: true }],
                    normalize: e => e && Number(e),
                  })(<SelectCategoryIdByTree />)}
                </Form.Item>
              </Col>

              <Col xs={5} sm={4}>
                <Form.Item label={t('_lang:status')}>
                  {getFieldDecorator('status', {
                    initialValue: props.item ? Number(props.item.status) : 0,
                  })(<SwitchNumber />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FormCard>
      </div>
    );
  }
}

// @ts-ignore
export const ArticleInfoForm = withTranslation()(Form.create<IFormProps>()(ArticleInfoFormInner));

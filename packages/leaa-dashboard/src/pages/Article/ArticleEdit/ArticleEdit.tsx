import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { Article, Tag } from '@leaa/api/src/entrys';
import { IAttachmentBoxRef } from '@leaa/api/src/interfaces';
import { ArticleUpdateOneReq } from '@leaa/api/src/dtos/article';
import { IPage, ICommenFormRef, ISubmitData, IHttpRes, IHttpError } from '@leaa/dashboard/src/interfaces';
import { msg, errorMsg, ajax } from '@leaa/dashboard/src/utils';

import { envConfig } from '@leaa/dashboard/src/configs';
import {
  PageCard,
  HtmlMeta,
  WYSIWYGEditor,
  SubmitToolbar,
  SelectTagId,
  AttachmentBox,
} from '@leaa/dashboard/src/components';

import { ArticleInfoForm } from '../_components/ArticleInfoForm/ArticleInfoForm';
import { ArticleExtForm } from '../_components/ArticleExtForm/ArticleExtForm';

import style from './style.module.less';

const API_PATH = 'articles';

export default (props: IPage) => {
  const { t } = useTranslation();
  const { id } = props.match.params as { id: string };

  const infoFormRef = useRef<ICommenFormRef<ArticleUpdateOneReq>>(null);
  const extFormRef = useRef<ICommenFormRef<ArticleUpdateOneReq>>(null);

  const [item, setItem] = useState<Article | undefined>();
  const [itemLoading, setItemLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const articleContentRef = useRef<any>(null);
  const attachmentBoxRef = useRef<IAttachmentBoxRef>(null);
  const selectTagIdRef = useRef<any>(null);
  const [articleTags, setArticleTags] = useState<Tag[]>();

  const onFetchItem = () => {
    setItemLoading(true);

    ajax
      .get(`${envConfig.API_URL}/${envConfig.API_VERSION}/${API_PATH}/${id}`)
      .then((res: IHttpRes<Article>) => {
        setItem(res.data.data);
      })
      .catch((err: IHttpError) => errorMsg(err.response?.data?.message || err.message))
      .finally(() => setItemLoading(false));
  };

  const onUpdateItem = async () => {
    const infoData: ISubmitData<ArticleUpdateOneReq> = await infoFormRef.current?.onValidateForm();
    const extData: ISubmitData<ArticleUpdateOneReq> = await extFormRef.current?.onValidateForm();

    if (!infoData) return;
    if (!extData) return;

    const data: ISubmitData<ArticleUpdateOneReq> = {
      ...infoData,
      ...extData,
      content: articleContentRef.current?.props?.value,
    };

    data.tagIds = articleTags?.length ? articleTags.map((tag) => tag.id) : null;

    setSubmitLoading(true);

    console.log(data);

    ajax
      .patch(`${envConfig.API_URL}/${envConfig.API_VERSION}/${API_PATH}/${id}`, data)
      .then((res: IHttpRes<Article>) => {
        setItem(res.data.data);

        msg(t('_lang:updatedSuccessfully'));
      })
      .catch((err: IHttpError) => errorMsg(err.response?.data?.message || err.message))
      .finally(() => setSubmitLoading(false));

    // attachments
    await attachmentBoxRef.current?.onUpdateAttachments();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onFetchItem(), []);

  return (
    <PageCard route={props.route} title="@UPDATE" className={style['wapper']} loading={itemLoading || submitLoading}>
      <HtmlMeta title={t(`${props.route?.namei18n}`)} />

      <ArticleInfoForm item={item} loading={itemLoading} ref={infoFormRef} />

      <WYSIWYGEditor
        ref={articleContentRef}
        content={item?.content}
        attachmentParams={{
          type: 'image',
          moduleId: id,
          moduleName: 'article',
          typeName: 'editor',
        }}
      />

      <div className={style['select-tag-id-wrapper']}>
        <SelectTagId
          ref={selectTagIdRef}
          placement="topLeft"
          maxSelectedSize={10}
          selectedTags={item?.tags}
          onChangeSelectedTagsCallback={(tags: Tag[]) => setArticleTags(tags)}
        />
      </div>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <AttachmentBox
            type="list"
            title={t('_lang:galleryMb')}
            listHeight={350}
            attachmentParams={{
              type: 'image',
              moduleId: item?.id,
              moduleName: 'article',
              typeName: 'gallery',
              typePlatform: 'mb',
            }}
          />
        </Col>

        <Col xs={24} sm={12}>
          <AttachmentBox
            type="list"
            title={t('_lang:galleryPc')}
            listHeight={350}
            attachmentParams={{
              type: 'image',
              moduleId: item?.id,
              moduleName: 'article',
              typeName: 'gallery',
              typePlatform: 'pc',
            }}
          />
        </Col>
      </Row>

      <div className={style['container-ext']}>
        <ArticleExtForm item={item} loading={itemLoading} ref={extFormRef} />
      </div>

      <SubmitToolbar
        simpleButtonGroup={{ title: '@UPDATE', loading: submitLoading }}
        simpleButtonAction={onUpdateItem}
      />
    </PageCard>
  );
};

import { BranchesOutlined } from '@ant-design/icons';
import { Divider, Skeleton, Space, Tag } from 'antd';
import classNames from 'classnames';
import Dayjs from 'dayjs';
import React from 'react';
import LazyLoad from 'react-lazyload';

import MarkdownPreview from '@/components/MarkdownPreview';
import { GithubBlogRepo, GithubOrigin, GithubOwner } from '@/constants/backend';
import type { IIssue } from '@/interfaces/questions';

export interface IArticleProps {
  className?: string;
  article: IIssue;
}

/**
 * 文章组件
 *
 * @param param0
 * @returns
 */
export default function Article({ className, article }: IArticleProps) {
  return (
    <article
      className={classNames({
        [className]: className,
      })}
    >
      <header>
        <h1 className="mb-3 text-4xl font-bold">{article.title}</h1>
      </header>

      <section className="flex items-center space-x-8">
        <Space
          key="list-vertical-id"
          onClick={(e) => {
            e?.stopPropagation && e.stopPropagation();
            e?.preventDefault && e.preventDefault();
            window.open(
              `${GithubOrigin}/${GithubOwner}/${GithubBlogRepo}/issues/${article?.number}`,
              '_blank',
            );
          }}
          className="group cursor-pointer"
        >
          <BranchesOutlined className="group-hover:text-[#1171ee]" rev={undefined} />
          <span className="group-hover:text-[#1171ee]">{`#${article?.number}`}</span>
        </Space>

        <Space
          key="list-vertical-user"
          onClick={(e) => {
            e?.stopPropagation && e.stopPropagation();
            e?.preventDefault && e.preventDefault();
            window.open(`${GithubOrigin}/${article?.user?.login}`, '_blank');
          }}
          className="group cursor-pointer"
        >
          <span className="group-hover:text-sky-500">{article?.user?.login}</span>
        </Space>

        <Space>
          <span className="text-[#8a919f]">
            {article?.created_at && Dayjs(article?.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </Space>

        <Space>
          <div className="flex items-center justify-start">
            {(article?.labels || [])
              .filter((label) => label.name !== 'blog')
              .map((label) => (
                <Tag color={`#${label.color}`} key={label.id}>
                  {label.name}
                </Tag>
              ))}
          </div>
        </Space>
      </section>

      <Divider className="!my-3 !border-[#bfc3c7]" />

      <section>
        <LazyLoad
          overflow={false}
          once={false}
          height={30}
          offset={50}
          placeholder={<Skeleton active />}
        >
          <MarkdownPreview
            source={(article.body || '').replace(/^---([\S\s]*?)---/, '')}
            showLoading
          />
        </LazyLoad>
      </section>
    </article>
  );
}

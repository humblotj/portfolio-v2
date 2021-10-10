import { ReactNode } from 'react';

import './TagList.scss';

interface TagProps {
  children?: ReactNode;
}

const Tag: React.FC<TagProps> = ({ children = null }) => (
  <li className="tag">{children}</li>
);

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <ul className="tag-list">
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </ul>
);

export default TagList;

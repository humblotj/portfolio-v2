import { ReactNode } from 'react';

import './TagList.scss';

interface TagProps {
    children?: ReactNode
}

const Tag = ({ children = null }: TagProps) => (
  <li className="tag">
    {children}
  </li>
);

interface TagListProps {
    tags: string[]
}

const TagList = ({ tags }: TagListProps) => (
  <ul className="tag-list">
    {tags.map(
      (tag) => <Tag key={tag}>{tag}</Tag>,
    )}
  </ul>
);

export default TagList;

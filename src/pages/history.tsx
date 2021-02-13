import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/header";
import { getMemos, getMemoPageCount, MemoRecord } from "../indexeddb/memos";

const { useState, useEffect } = React;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`;

// export const History: React.FC = () => {
interface Props {
  setText: (text: string) => void;
}
export const History: React.FC<Props> = (props) => {
  const { setText } = props;
  const history = useHistory();
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
//   console.log(memos);

  useEffect(() => {
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);
  // 初回レンダリングで、getMemos実行してStateに保存、第2引数は今回はなし
  // useEffectは「副作用 (effect) フック」と呼ばれ、レンダリングの後 に実行

  const canNextPage: boolean = page < maxPage; // 最大ページ数未満であれば次ページに遷移可能
  const canPrevPage: boolean = page > 1; // 2ページ目以降であれば前ページに遷移可能
  const movePage = (targetPage: number) => {
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    console.log(targetPage);
    setPage(targetPage);
    getMemos(targetPage).then(setMemos);
  };

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              history.push("/editor");
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  );
};

import styled from "styled-components";
import ValidateCard from "../molecules/ValidateCard";
import { useMemo, useState } from "react";

type ListProps = {
  title: string;
  data: Array<{ name: string; document: number; email: string; phone: string }>;
  filter: string;
  isProspect: boolean;
};

const ITEMS_PER_PAGE = 10;

export default function List({ title, data, filter, isProspect }: ListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = useMemo(() => {
    return data.filter(({ name, document }) => {
      return (
        !filter ||
        name.toLowerCase().includes(filter.toLowerCase()) ||
        document.toString().toLowerCase().includes(filter.toLowerCase())
      );
    });
  }, [filter, data]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredList]);

  const titleColor = isProspect ? "#16A34A" : "#3C6AF0";

  return (
    <Container>
      <Title color={titleColor}>{title}</Title>
      {paginatedList.length > 0 ? (
        paginatedList.map((item) => (
          <ValidateCard
            key={item.document}
            name={item.name}
            document={item.document}
            email={item.email}
            phone={item.phone}
          />
        ))
      ) : (
        <EmptyMessage>
          There is not {title.toLowerCase()} on the list.
        </EmptyMessage>
      )}
      {filteredList.length > ITEMS_PER_PAGE && (
        <Pagination>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </Pagination>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;
const Title = styled.h2<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #808a93;
  text-align: center;
  margin-top: 1rem;
`;


const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  color:#808a93;

  button {
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background-color: #3c6af0;
    border: none;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }

  span {
    font-size: 1rem;
  }
`;

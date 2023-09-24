import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



export default function PaginationControlled(props) {
  const [page, setPage] = React.useState(1);
  
  const handleChange = (event, value) => {
    event = props.paginate(value);
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(props.totalItems / props.itemsOnPage)}
        page={page}
        shape="rounded"
        variant="outlined"
        color="primary"
        onChange={handleChange}
        className='d-flex justify-content-center align-items-center py-4'
      />
    </Stack>
  );
}

import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import {getUsers} from '../_mocks_/user';
import { deleteCall, postCall, putCall } from 'src/utils/service';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUSERLIST] = useState([]);
  const [formType, setFormType] = useState('create');
  const [open, setOpen] = useState(false);
  const [idUpdated, setIdUpdated] = useState();
  const handleOpen = () => {
    setFormType('create');
    setOpen(true);
    resetForm();

  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      setUSERLIST(response);
    }
    fetchData();
    
  }, [selected, USERLIST]);

  useEffect(() => {
    if(open && formType === 'update' && idUpdated) {
      const {name, company, role, isVerified, status} = USERLIST.filter(value => value.id === idUpdated)[0]
      console.log("filter", USERLIST.filter(value => value.id === idUpdated));
      // setTimeout(() => {
        setFieldValue("name", name);
        setFieldValue("company", company);
        setFieldValue("role", role);
        setFieldValue("verified", isVerified);
        setFieldValue("status", status);
      // } ,1000);
    }
  } , [open, formType, idUpdated]);

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    company: Yup.string().required('Company is required'),
    role: Yup.string().required('Role is required'),
    verified: Yup.string().oneOf(['Yes', 'No']).required('Verified is required'),
    status: Yup.string().oneOf(['Not active', 'Active']).required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      role: '',
      verified: '',
      status: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if(formType === 'create') {
        await postCall('/dashboard/user/create', {
          "name": values?.name,
          "company": values?.company,
          "role": values?.role,
          "verified": values?.verified,
          "status": values?.status,
        })
      } else {
        await putCall(`/dashboard/user/edit/${idUpdated}`, {
          "name": values?.name,
          "company": values?.company,
          "role": values?.role,
          "verified": values?.verified,
          "status": values?.status,
        })
      }
      setUSERLIST(USERLIST.concat(
        {
          "id": "99392993",
          "name": values?.name,
          "company": values?.company,
          "role": values?.role,
          "verified": values?.verified,
          "status": values?.status,
        }
      ));
      handleClose();
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleDelete = async () => {
    if(selected && selected.length > 0) {
      for(let i = 0; i < selected.length; i++) {
        await deleteCall(`/dashboard/user/delete/${selected[i]}`);
      }
    }
    setSelected([]);
  }

  const handleSingleDelete = async (id) => {
    await deleteCall(`/dashboard/user/delete/${id}`);
    setSelected(selected.filter(item => item !== id));
  }

  const handleSingleUpdate = (id) => {
    setFormType('update');
    setIdUpdated(id);
    setOpen(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>
        </Stack>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={style}>
        <TextField
            fullWidth
            // autoComplete="name"
            type="text"
            label="Name"
            sx={{my: 2}}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            // autoComplete="company"
            type="text"
            label="Company"
            sx={{my: 2}}
            {...getFieldProps('company')}
            error={Boolean(touched.company && errors.company)}
            helperText={touched.company && errors.company}
          />
          <TextField
            fullWidth
            // autoComplete="role"
            type="text"
            label="Role"
            sx={{my: 2}}
            {...getFieldProps('role')}
            error={Boolean(touched.role && errors.role)}
            helperText={touched.role && errors.role}
          />
          <TextField
            fullWidth
            // autoComplete="verified"
            type="text"
            label="Verified"
            sx={{my: 2}}
            {...getFieldProps('verified')}
            error={Boolean(touched.verified && errors.verified)}
            helperText={touched.verified && errors.verified}
          />
          <TextField
            fullWidth
            // autoComplete="status"
            type="text"
            label="Status"
            sx={{my: 2}}
            {...getFieldProps('status')}
            error={Boolean(touched.status && errors.status)}
            helperText={touched.status && errors.status}
          />
          <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {formType === 'create' ? 'Create' : 'Update'}
        </LoadingButton>
        </Box>
        </Form>
        </FormikProvider>
      </Modal>

        <Card>
          <UserListToolbar
            selected={selected}
            handleDelete={handleDelete}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'Not active' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu id={id} handleSingleDelete={handleSingleDelete} handleSingleUpdate={handleSingleUpdate}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

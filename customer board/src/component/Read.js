import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Table, Icon } from 'semantic-ui-react';
import { API_URL } from '../Api/URL'
import { useNavigate } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Swal from 'sweetalert2';



function Read() {
  const [apiData, setAPIData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();


  const handleSort = () => {
    if (sortOrder === 'asc') {
      setAPIData([...apiData].sort((a, b) => a.yourName.localeCompare(b.yourName)));
      setSortOrder('desc');
    } else {
      setAPIData([...apiData].sort((a, b) => b.yourName.localeCompare(a.yourName)));
      setSortOrder('asc');
    }
  };

  const updateUser = ({
    yourName,
    address,
    birthday,
    mail, id }) => {
    localStorage.setItem('id', id)
    localStorage.setItem('yourName', yourName)
    localStorage.setItem('address', address)
    localStorage.setItem('birthday', birthday)
    localStorage.setItem('mail', mail)
    navigate('/update')
  }

  const deleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(API_URL + id);
          callGETApi();
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          console.log(error);
          Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
        }
      }
    });
  };


  const callGETApi = async () => {
    const resp = await axios.get(API_URL);
    setAPIData(resp.data);
    console.log(resp.data);

  }
  useEffect(() => {
    callGETApi();
  }, []);

  return (


    <>
      <br />
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button primary floated='left' onClick={() => navigate(-1)}>Back to Form</Button>

      </div>
      <br />
      <br />
      <br />
      <div style={{ backgroundColor: '#a39daa', minHeight: '100vh' }}>
      <div style={{ margin: '0 auto', maxWidth: '800px'  }}>
        <Table singleLine striped>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={handleSort} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '5px' }}>Name</span>
                {sortOrder === 'asc' ? <Icon name="angle up" /> : <Icon name="angle down" />}
              </Table.HeaderCell>


              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Date of Birth</Table.HeaderCell>
              <Table.HeaderCell>Gmail</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {apiData.map((data, index) => (
              <Table.Row key={data.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <Table.Cell>{data.yourName}</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
                <Table.Cell>{data.birthday}</Table.Cell>
                <Table.Cell>{data.mail}</Table.Cell>
                <Table.Cell>
                  <Button inverted color='red' onClick={() => deleteUser(data.id)}>Delete</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button inverted color='green' onClick={() => updateUser(data)}>Update</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
    </>
  )
}

export default Read
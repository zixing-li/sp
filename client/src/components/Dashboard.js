import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Link to="/surveys/new" type="button" class="btn btn-primary">Add Survey</Link>
    </div>
  )
}

export default Dashboard;
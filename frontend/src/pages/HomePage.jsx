import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (type && job.type !== type) return false;
    if (location && job.location !== location) return false;
    if (minSalary && job.salary < parseInt(minSalary)) return false;
    if (maxSalary && job.salary > parseInt(maxSalary)) return false;
    return true;
  });

  const handleFilter = () => {
    setType('');
    setLocation('');
    setMinSalary('');
    setMaxSalary('');
  };

  return (
    <div className="home">
      <div className="filters" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Helsinki">Helsinki</option>
          <option value="Espoo">Espoo</option>
          <option value="Vantaa">Vantaa</option>
          <option value="Remote">Remote</option>
        </select>
        <input
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          placeholder="Min Salary"
        />
        <input
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="number"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          placeholder="Max Salary"
        />
        <button style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} onClick={handleFilter}>Clear Filters</button>
      </div>
      <div className="job-list">
        {filteredJobs.length === 0 && <p>No jobs found</p>}
        {filteredJobs.length !== 0 &&
          filteredJobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;

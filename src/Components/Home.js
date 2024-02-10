import React, { useState, useEffect } from 'react';
import Header from './Header';
import studentData from './studentData.json';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import '../CSS/Home.css';

function Home({ uid }) {
  const [student, setStudent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const student = studentData.find(student => student.uid === uid);
    setStudent(student);

    const fetchSkills = async () => {
      const response = await fetch(`/AddSkills/get-skills/${uid}`);
      const data = await response.json();
      if (data) {
        setSkills(data);
      }
    };
    fetchSkills();

    const fetchAchievements = async() => {
      const res = await fetch(`/Achievements/get-achievements/${uid}`);
      const data = await res.json();
      if(data) {
        setAchievements(data);
      }
    };
    fetchAchievements();

  }, [uid]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header uid={uid} />
      <Container>
        <Row xs={1} md={3}>
          <Col>
            <Card className="mb-4">
              <Card.Header style={{backgroundColor: '#D7DAF2', color: 'black'}}>Profile</Card.Header>
              <Card.Body className="scrollable-card">
                <Image src={student.Image} roundedCircle width="150" height="150" className="mb-3" />
                <Card.Title className='std-name'>{student.name}</Card.Title>
                <Card.Text className='text'>
                  <strong className='info'>{student.uid}</strong><br/>
                  <strong className='info'>{student.Branch}</strong><br/><br/>
                  <strong className='details'>B.Tech Percentile:</strong> {student["B.Tech-Percentile"]}<br/>
                  <strong className='details'>Active Backlogs:</strong> {student["Active-Backlogs"]}<br/>
                  <strong className='details'>Passive Backlogs:</strong> {student["Passive-Blacklogs"]}<br/>
                  <strong className='details'>10th Percentile:</strong> {student["10th-Percentile"]}<br/>
                  <strong className='details'>Inter/Diploma Percentile:</strong> {student["Inter/Diploma-Percentile"]}<br/>
                  <strong className='details'>EAMCET Rank:</strong> {student["EAMCET-Rank"]}<br/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-4">
                 <Card.Header style={{backgroundColor: '#D7DAF2', color: 'black'}}>Skills</Card.Header>
                 <Card.Body className="scrollable-card">
                   {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <p key={index}>{skill}</p>
                  ))
                ) : (
                  <p>No Skills ☹️!! Go Add Skills!!</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-4">
              <Card.Header style={{backgroundColor: '#D7DAF2', color: 'black'}}>Achievements</Card.Header>
              <Card.Body className="scrollable-card">
                {achievements.length > 0 ? (
                  <ul>
                    {achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No Achievements ☹️!!</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
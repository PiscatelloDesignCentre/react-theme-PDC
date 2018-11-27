import React, { Component } from 'react';
import WorkPageHeader from '../WorkPageHeader/WorkPageHeader';
import { Container, Row, Col } from 'react-grid-system';

import '../../App.css';
import './WorkPageSingle.css';
import Button from '../Button/Button';

class WorkPageSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    }
  }
  async componentDidMount() {
    const content = await this.getPostContent();
    console.log(content);
    this.setState({post: content.data.posts.edges[0].node})
  }
  
  async getPostContent(id) {
    let reqData = {
      "query": `{ 
        posts {
          edges {
            node {
              id
              title
              date
              author {
                id
                name
                username
                description
              }
            }
          }
        } 
      }`
    }

    let res = await fetch("https://api.piscatello.space/graphql", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(reqData)
    }).then(response => response.json());

    return res;
  }

  render() {
    return (
      <div className="work-page-single">
        <WorkPageHeader></WorkPageHeader>
        <section id="project-content">
          <Container className="container" fluid={true} style={{padding: 0}}>
            <div className="single-project-banner-description">
              <Row style={{padding: "1.5rem 0"}}>
                <Col xs={12} sm={6}>
                  <h4 className="reg text-black">Lorem Ipsum</h4>
                </Col>
                <Col xs={12} sm={6}>
                  <h4>{this.state.post !== null ? <pre>{this.state.post.title}</pre>: ""}</h4>
                </Col>
              </Row>
            </div>
            <div className="single-project-banner">
              <img src="http://piscatello.com/wp-content/uploads/2018/09/NomadX-1.jpg" alt="Nomadx"/>
            </div>
            <div className="single-project-banner-description">
              <Row style={{padding: "1.5rem 0"}}>
                <Col xs={12} sm={6}>
                  <h4 className="reg text-black">Lorem Ipsum</h4>
                </Col>
                <Col xs={12} sm={6}>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non velit est.</h4>
                </Col>
              </Row>
            </div>
            <div className="single-project-grid">
              <div className="item">
                <img src="http://piscatello.com/wp-content/uploads/2018/09/NomadX-2.jpg" alt="Color Guide" />
              </div>
              <div className="item">
                <img src="http://piscatello.com/wp-content/uploads/2018/09/Nomadx_Type.jpg" alt="Color Guide" />
              </div>
              <div className="item">
                <img src="http://piscatello.com/wp-content/uploads/2018/09/NomadX-5.jpg" alt="letterhead" />
              </div>
              <div className="item">
                <img src="http://piscatello.com/wp-content/uploads/2018/09/NomadX-6.jpg" alt="tote" />
              </div>
            </div>
            <div className="single-project-banner">
              <img src="http://piscatello.com/wp-content/uploads/2018/09/Nomadx-BC.jpg" alt="business cards" />
            </div>
            <div className="bottom-directions">
              <Button button-lg arrow className="black center text-bold">Last Project</Button>
              <Button button-lg arrow className="black center text-bold">View More Projects</Button>
              <Button button-lg arrow className="black center text-bold">Next Project</Button>
            </div>
          </Container>
        </section>
      </div>
    );
  }
}

export default WorkPageSingle;

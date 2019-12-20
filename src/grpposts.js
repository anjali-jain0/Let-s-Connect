import React, { Component } from 'react';

class GrpPosts extends Component {
  
  constructor(props){
    super(props);
    this.state={
      grpposts:'',
      following : '',
      posts : '',
      cmt:''
    }
  }
   
  componentWillMount(){

    var id = this.props.match.params.id;
    fetch('/grppost/' + id)
    .then(res => res.json())
    .then(data => this.setState({grpposts:data}));

  }

  // handleChange = (e) => {
  //   this.setState({[e.target.name]:e.target.value});
  // }
  
  // handlePost = (name) => {
  //   fetch('/showpost/' + name)
  //     .then(res => res.json())
  //     .then(data => this.setState({posts : data.posts}))
  // }

  // handleSubmit = (e ,id) => {
  //   e.preventDeafult();
  //   var cmt = this.stte.cmt;
  //   fetch('/comment/' + cmt + '/' + id)
  //     .then(res => res.json())
  //     .then(data => this.setState({posts : data.posts}));
  // }
 
  // handleLike = (id) => {

  //   fetch('/post/' + id)
  //     .then(res => res.json())
  //     .then(data => this.setState({posts : data.posts}))
  // }

  render() { 
    // var compo = (this.state.following && this.state.following.map(name => {
    //               return (
    //                 <div><button onClick={() => this.handlePost(name)}>{name}</button></div>
    //               );
    //             })
    // )

    var posts =  (this.state.grpposts && this.state.grpposts.map(post => {
                  return (

                    <div className="card" >
                    <div className="card-body">
                    <p>{post.caption}</p>
                    </div>
                    </div>


                  );
                })
    )

  return (
  <div>
  {posts}
  </div>
  );

}}

export default GrpPosts;

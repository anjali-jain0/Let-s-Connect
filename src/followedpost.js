import React, { Component } from 'react';

class Followedpost extends Component {
  
  constructor(props){
    super(props);
    this.state={
      user:'',
      share_seleted : '',
      tag_selected : '',
      following : '',
      posts : '',
      comment:'',
      allusers : '',
      publicKey:'BKgPEG-yxGjEwubcob9tfvgfOkqjJW9EPe60SDiaJNo_EudTYOMZGkjdVP9wzVUJOCcmecelw4OKbHu-tcw2p4Y'
    }
  }

  componentWillMount(){
   var id = this.props.usr_id;
    fetch('/followedpost/' + id)
    .then(res => res.json())
    .then(data => this.setState({posts:data}));
    
    fetch('/myfollowing/' + id)
    .then(res => res.json())
    .then(data => this.setState({user:data}));
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }
  
  // handlePost = (name) => {
  //   fetch('/showpost/' + name)
  //     .then(res => res.json())
  //     .then(data => this.setState({posts : data.posts}))
  // }

  handleS = (e) => {
    e.preventDefault();
    console.log('hello');
    // console.log('cameee' + id)
    // var cmt = this.state.cmt;
    // fetch('/comment/' + cmt + '/' + id)
    //   .then(res => res.json())
    //   .then(data => this.setState({posts : data.posts}));
  }
 
  handleLike = (id) => {

    fetch('/post/' + id)
      .then(res => res.json())
      .then(data => this.setState({posts : data.posts}))
  }

  handleme = (id,e) => {
    e.preventDefault();
    //console.log(id);
  }

  // handleShare1 = (e) => {
    
  //   var shared = this.state.share_seleted;
  //   shared.push(e.target.value);
  //   this.setState({share_seleted : shared});
  // }

  handleShare = (e,id,id2) => {
    e.preventDefault();
    console.log(id);
    console.log(id2);
    fetch('/share/' + id + '/' + id2)
     .then(res => res.json());
  }

  // handleShare2 = async (id , myid , e) => {
  //   console.log('hey man 0');
  //   e.preventDefault();

    // //store this somewhere??

    // if('serviceWorker' in navigator){
    //   console.log('Registering SW...');
    //   const register = await navigator.serviceWorker.register('./worker2.js',{
    //     scope:'/'
    //   });

    //     console.log('SW is registered...');
    //     console.log('Register Subscription...');
    //     const subscription=register.pushManager.subscribe({
    //     userVisibleOnly:true,
    //     applicationServerKey:this.urlBase64ToUint8Array(this.state.publicKey)
    //     });
      
    //     console.log('Push notification...');
      //fetch('/share/' + id + '/' + myid + '/' + this.state.share_seleted);
        //,{
      //   method:'POST',
      //   body:JSON.stringify(subscription),
      //   headers:{
      //     'content-type':'application/json'
      //   }
      // });
    // }
  //}

  //  handleTag1 = (e) => {
    
  //   var taged = this.state.tag_seleted;
  //   taged.push(e.target.value);
  //   this.setState({tag_seleted : taged});
  // }

  // handleTag2 = async (e , id , myid) => {
  //   e.preventDefault();
  //   if('serviceWorker' in navigator){
  //     console.log('Registering SW...');
  //     const register = await navigator.serviceWorker.register('./worker2.js',{
  //       scope:'/'
  //     });

  //       console.log('SW is registered...');
  //       console.log('Register Subscription...');
  //       const subscription=register.pushManager.subscribe({
  //       userVisibleOnly:true,
  //       applicationServerKey:this.urlBase64ToUint8Array(this.state.publicKey)
  //       });
      
  //       console.log('Push notification...');
  //       fetch('/tag/' + id + '/' + myid + '/' + this.state.tag_seleted,{
  //       method:'POST',
  //       body:JSON.stringify(subscription),
  //       headers:{
  //         'content-type':'application/json'
  //       }
  //     });
  //   }
  // }


  // urlBase64ToUint8Array = (base64String) => {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, '+')
  //     .replace(/_/g, '/');

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }

  handleComment = (e,postid)=> {

  console.log('here');
  e.preventDefault();
  fetch('/addcomment/' + this.state.comment + '/' + postid)
    .then(res => res.json())
    .then(data => {
      //this.componentWillMount();
      var id = this.props.usr_id;
      fetch('/followedpost/' + id)
      .then(res => res.json())
      .then(data => this.setState({posts:data,comment:''}));
  });

  }

  render() { 
    // var compo = (this.state.following && this.state.following.map(name => {
    //               return (
    //                 <div><button onClick={() => this.handlePost(name)}>{name}</button></div>
    //               );
    //             })
    //             )

    const myid = this.props.usr_id;

    var share = (this.state.user && this.state.user.map(user => {
                  return (

                    <div className="card" >
                      <div className="card-body">
                        <p>{user.name} , {user._id}</p>
                        <form onSubmit = {(e) => this.handleShare(e,myid,user._id)} >
                        <button type='submit' className='btn btn-success'>Share</button>
                        </form>
                        <form onSubmit = {(e) => {this.handleTag(e,myid,user._id)}} >
                        <button type='submit' className='btn btn-success'>Tag</button>
                        </form>
                      </div>
                    </div>
                  )
                })
              )
   

    var comments = (this.state.posts && this.state.posts.map(post => {
                    var ans = (post.comment && post.comment.map(cmt => {
                      return (
                          <span>{cmt}</span>
                      );
                    }))

                    return (

                     <div className="card" style={{width:1000}}>
                      <div className="card-body">
                      <p>{ans}</p>
                      </div>
                    </div>
                    );
                  })
              );

    var posts =  (this.state.posts && this.state.posts.map(post => {
                  return (

                   <div className="card" style={{width:1000}}>
                    <div className="card-body">
                    <p>{post.caption}</p>

                    <div className="container">
                      <form className="white" onSubmit={(e) => this.handleComment(e,post._id)}>
                        <div className="input-field">
                          <label htmlFor="comment">Comment</label>
                          <input type="text" name="comment" value={this.state.comment} onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                          <button type="submit" className="btn #009688 lighten-1 z-depth-0">Write</button>
                        </div>
                      </form>
                    </div>
                    
                    {comments}
                    {share}
                    </div>
                  </div>

        
                  );
                })
    );

  return (
  <div>
  {posts}
  </div>
  );

}}

export default Followedpost;

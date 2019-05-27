import React from 'react';
// import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
//import '../node_modules/papercss/dist/paper.css';
import "../node_modules/animate.css"
//import WOW from "../node_modules/wow"
//import WOW from 'wowjs'
import "../node_modules/react-touch-events/lib/index"

//import ReactTouchEvents from "react-touch-events";



import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressBar } from 'react-bootstrap';
import { Fragment } from "react";
import { MDBBtn } from "../node_modules/mdbreact/dist/mdbreact";
//import {wow} from 'wowjs'
import WOW  from 'wowjs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: "",
      count: 0,
      cpin: 0,
      sortarr: [],
      arr: []
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.aescsorting = this.aescsorting.bind(this);
    this.descsorting = this.descsorting.bind(this);
    this.datesort = this.datesort.bind(this);
    this.selectsort = this.selectsort.bind(this);
    this.showLocal = this.showLocal.bind(this);
  
}














//local storage
showLocal(){
  const name = localStorage.getItem("name");
  const status = localStorage.getItem("status")
  const key = localStorage.getItem("key")
  const date = localStorage.getItem("date")
  const pinstatus = localStorage.getItem("pinstatus")

  let a = []
  a.push(name)
  a.push(status)
  a.push(key)
  a.push(date)
  a.push(pinstatus)
  alert(a)
  
}

  componentDidMount() {
      new WOW.WOW({
          live: false
      }).init();
      
  }
  //show list
  item() {
    return this.state.arr.map((its, i) =>
      <div key={i} className="animated zoomInLeft" id="oo">
        <li onDoubleClick={() => { this.pinstat(i) }} onClick={() => { this.changeStatus(i) }}  id="cs"
        className={(its.status)?"ll":"jj"}  >
           {/* className={(its.status) ? "ll paper-btn btn-block":"jj paper-btn btn-block"} */}
          <h5 className="head5">{its.name}</h5>
          
          {(its.pinstatus === "true") ? <FontAwesomeIcon icon={faThumbtack} className="pinc" /> : ""}
          <span className="dd">{its.date}</span>
          </li>
         
        <i className="bb animated heartBeat fas fa-arrow-circle-up" onClick={() => { this.uplist(i) }}></i>
        <i className="bb animated heartBeat fas fa-arrow-circle-down" onClick={() => { this.downlist(i) }}></i>
        <button className="cc animated flip fas fa-window-close " onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deletelist(i) }}></button>
      </div>)
  }
  
  //add the list  
  setValue() {
    if (this.state.newValue) {
      var pp = this.state.arr;
      pp.push({
        name: this.state.newValue,
        status: "false",
        key: this.state.arr.length,
        date: new Date().toLocaleString(),
        pinstatus: "false"
      });
  
      localStorage.setItem("name",pp.map((ind,i)=>ind.name))
      localStorage.setItem("status",pp.map((ind,i)=>ind.status))
      localStorage.setItem("key",pp.map((ind,i)=>ind.key))
      localStorage.setItem("date",pp.map((ind,i)=>ind.date))
      localStorage.setItem("pinstatus",pp.map((ind,i)=>ind.pinstatus))

      this.setState(
        { arr: pp, newValue: "" }
      );
    }
    // empty the field
    let i = document.getElementById("hi");
    i.value = "";
     
  }





  //changeStatus
  changeStatus(i) {
    let c = this.state.count;
    let a = this.state.arr
    a[i].status = !a[i].status;
    c = (a[i].status) ? c -= 1 : c += 1
    this.setState({ arr: a, count: c })
    //console.log(this.state.arr)
  }
  //take the textfield value
  getValue(event) {
    if (event.target.value !== "" && event.target.value.trim()) {
      this.setState(
        { newValue: event.target.value });
    }
  }
  //increment the value
  len() {
    return this.state.arr.length;
  }
  //move list up
  uplist(i) {
    let uparr = this.state.arr
    if (uparr[i - 1] !== undefined) {
      let current = uparr[i]
      uparr[i] = uparr[i - 1]
      uparr[i - 1] = current
      this.setState({ arr: uparr })
      console.log(this.state.arr);
    }
  }
  //move list down
  downlist(i) {
    let downarr = this.state.arr
    if (downarr[i + 1] !== undefined) {

      [downarr[i], downarr[i + 1]] = [downarr[i + 1], downarr[i]]
      this.setState({ arr: downarr })
    }
  }
  // {(its.status) ? "ll paper-btn btn-block":(its.status)?"jj paper-btn btn-block":(this.deletelist)?"wow flipInY":"wow flipInY"}
  //remove element
  deletelist(i) {
    let dele = this.state.arr
    dele.splice(i, 1);
    // this.className = c
    
    this.setState({ arr: dele })
  }
  //sorting in aesc
  aescsorting() {
    let arrsort = this.state.arr;
    let s = arrsort.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    this.setState({ arr: s })
  }

  //sorting in desc
  descsorting() {
    let arrsortd = this.state.arr;
    let t = arrsortd.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    this.setState({ arr: t })
  }
  //sorting date
  datesort() {
    let arrsortdate = this.state.arr;
    let z = arrsortdate.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
    this.setState({ arr: z })
  }
  //sort by selected
  selectsort() {
    let arrsortselect = this.state.arr;
    console.log(arrsortselect)
    let z = arrsortselect.sort((a, b) => a.status === false ? -1 : b.status === false ? 1 : 0)
    this.setState({ arr: z })
  }


  //pinststus
  pinstat(i) {
    let pinarr = this.state.arr;
    let c = this.state.cpin
    let ss = (pinarr[i].pinstatus === "false") ? "true" : "false"
    pinarr[i].pinstatus = ss
    if (ss === "true") {
      let pin = pinarr[i];
      pinarr[i] = pinarr[c]
      pinarr[c] = pin
      c += 1
    }
    else { c -= 1 }
    this.setState({ arr: pinarr, cpin: c })
  }
  // componentDidMount(){
  //   // var kk = new WOW.WOW().init();
  //   // kk.sync();
     
  // }
  


  render() {
    return (<div className="todo">
      {/* heading todolist */}
      <div className="container-fluid head">
        <div className="row">
          <div className="col-md-12">
            <h1 className="head animated zoomInLeft" data-wow-duration="2s" data-wow-delay="1s">{this.props.name}</h1>
          </div>
        </div>
      </div>
      {/*End heading todolist */}
      {/* input field */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h2 className="head2"><span>Enter the value:</span></h2>
          </div>
          <div className="col-md-6">
            <input className="inp" type="text" id="hi" onChange={this.getValue} ref="data" />
          </div>
        </div>
      </div>
      
      {/* end input field */}
      {/* button  */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 btn">
            <Fragment>
              <MDBBtn rounded outline color="secondary" className="butt" onClick={this.setValue} >Submit</MDBBtn>
            </Fragment>
          </div>
          <div className="col-md-4 btn">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle butt" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Order By
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button onClick={this.aescsorting} className="dropdown-item" type="button">Low to high</button>
                <button onClick={this.descsorting} className="dropdown-item" type="button">High to low</button>
                <button onClick={this.datesort} className="dropdown-item" type="button">Newest</button>
                <button onClick={this.selectsort} className="dropdown-item" type="button">Selected</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 btn">
            <Fragment>
              <MDBBtn rounded outline color="secondary" className="butt" onClick={this.showLocal} >ShowLocal</MDBBtn>
            </Fragment>
          </div>


        </div>
      </div>
      {/* end button */}

      {/* status */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 stat">

            <h2 className="row flex-center">Total Items : {this.state.count}/{this.len()}</h2>
          </div>
        </div>
      </div>

      {/* end status */}
      {/* progress bar */}
      {/* <div> Selected item:<ProgressBar now={this.state.count} max={20} label={this.state.count+"%"}  animated className="pro"/></div>
       */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 pro">
        <ProgressBar >
          <ProgressBar now={this.state.arr.length} max={10} label={this.state.arr.length + "0%"} animated />
        </ProgressBar>

        </div>
        <div className=" col-md-5 pro">
        <ProgressBar >
          <ProgressBar striped variant="success" label={(this.state.count <= 5) ? this.state.count + "0%" : "50%"}
            now={(this.state.count <= 5) ? this.state.count : "5"} key={1} max={10} />


          <ProgressBar striped variant="warning" label={(this.state.count >= 6 && this.state.count <= 8) ? this.state.count + "0%" : (this.state.count <= 5) ? "" : ""}
            now={(this.state.count >= 6 && this.state.count <= 8) ? this.state.count - 5 : (this.state.count <= 5) ? "" : "3"} key={2} max={10} />


          <ProgressBar striped variant="danger" label={this.state.count + "0%"}
            now={(this.state.count >= 9) ? this.state.count - 8 : ""} key={3} max={10} />

        </ProgressBar>
        </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 selecthead">
            <h3 >Total Item:</h3>
          </div>
          <div className="col-md-6 selecthead">
            <h3 >Selected-Item</h3>
          </div>
        </div>
       
      </div>

      {/*end progress bar  */}

      

       {/* input bar */}
      <ul className="unord">
        {this.item()}
      </ul>
    </div>
    //  end of inpur bar
    );
  }
}
export default App;
import React from 'react';
import ReactDom from 'react-dom';

var WorkList = React.createClass({
    render:function() {
        var row = [];
        this.props.dataList.forEach((item,index) => {
            if(item.cancle === false) {
                row.push(<WorkInner key={index} id={item.id} value={item.value} canClick={item.canClick} toggleInner={this.props.toggleInner} toggleCancle={this.props.toggleCancle}></WorkInner>)
            }
        })
        return (
            <div style={{padding:'0 20px'}}>
                {row}
                <WorkOrder dataList={this.props.dataList} finsh={this.props.finsh}></WorkOrder>
            </div>
        )
    }
})

var WorkInner = React.createClass({
    onHandleClick:function() {
        this.props.toggleInner(this.props.id);
    },
    onHandleCancle:function() {
        this.props.toggleCancle(this.props.id)
    },
    render:function() {
        var style={
            padding:'10px 0px',
            border:'1px solid #ccc',
            backgroundColor:'#fff',
            position:'relative',
        }
        var canClick = this.props.canClick;
        if(canClick === true) {
            style.backgroundColor = '#eee';
            style.textDecoration = 'line-through';
            style.color = 'green';
        }else{
            style.backgroundColor = '#fff'
        }
        return (
            <div style={style}>
                <input type="checkbox" onClick={this.onHandleClick}/>
                <span>{this.props.value}</span>
                <span style={{position:'absolute',right:0,padding:'0 5px'}} onClick={this.onHandleCancle}>删除</span>
            </div>
        )
    }
})

var WorkOrder = React.createClass({
    render:function() {
        var dataList = this.props.dataList;
        var finsh = this.props.finsh;
        var number = dataList.length;
        dataList.map(function(item,index) {
            if(item.cancle === true) {
                number = number - 1;
            }
        })
        var style={
            padding:'10px 0px',
            border:'1px solid #ccc',
            backgroundColor:'#fff',
        }
        return (
            <div style={style}>
                    <span>{finsh.length}</span>
                    <span>已完成</span>
                    <span>/</span>
                    <span>{number}</span>
                    <span>总数</span>
            </div>
        )
    }
})
var Search = React.createClass({
    onChangeFun:function() {
        this.props.onHandleChange(this.refs.inp.value);
    },
    render:function() {
        return (
            <div style={{margin:'20px 5px'}}>
                <div>
                    <span>Task</span>
                    <input type="text" value={this.props.input} style={{marginLeft:'20px'}} ref='inp' onChange={this.onChangeFun}/>
                </div>
                <div onClick={this.props.SaveFun}>Save Task</div>
            </div>
        )
    }
})


var App = React.createClass({
    getInitialState:function() {
        return {
            list:[],
            finsh:[],
            cancle:[],
            input:'',
        }
    },
    toggleInner:function(id) {
        var toggleinner = null;
        var data = this.props.dataList.map(function(item,index) {
            if(item.id === id) {
                toggleinner = item;
                item.canClick = !item.canClick;
            }
            return item
        })
        this.setState({
            list:data
        })
        
        var finshList = [];
        data.map(function(item,index) {
            if(item.canClick === true) {
                finshList.push(item)        
            }
        })
        this.setState({
            finsh:finshList
        })
    },
    toggleCancle:function(id) {
        var toggleCancle = null;
        var data = this.props.dataList.map(function(item,index) {
            if(item.id === id) {
                toggleCancle = item;
                item.cancle = true;
            }
            return item
        })
        this.setState({
            cancle:data
        })
    },
    onHandleChange:function(inputValue) {
        this.setState({
            input:inputValue
        })
    },
    SaveFun:function() {
        var length = this.props.dataList.length+1;
        if(this.state.input !== ''){
           var obj = {
                value:this.state.input,
                id:length,
                canClick:false,
                cancle:false
           }
           this.props.dataList.push(obj);
        }
        this.setState({
            input:''
        })
    },
    render: function() {
        var dataList = this.props.dataList;
        return (
            <div style={{background:'#eee',width:'90%',fontSize:'18px'}}>
              <h1 style={{textAlign:'center'}}>React Todo</h1>
              <WorkList dataList={this.props.dataList} toggleInner={this.toggleInner} toggleCancle={this.toggleCancle} finsh={this.state.finsh}></WorkList>
              <Search onHandleChange={this.onHandleChange} SaveFun={this.SaveFun} input={this.state.input} ></Search>
            </div> 
        )
    }
})

var dataList = [
    {value:'越努力，越幸运',id:1,canClick:false,cancle:false},
    {value:'跳舞',id:2,canClick:false,cancle:false},
    {value:'健身',id:3,canClick:false,cancle:false},
    {value:'瑜伽',id:4,canClick:false,cancle:false},
    {value:'似lay',id:5,canClick:false,cancle:false},
]

ReactDom.render(
    <App dataList={dataList}/>,
    document.getElementById('root')
);




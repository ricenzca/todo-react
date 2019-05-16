/******************************************************/
/******************************************************/
/******************************************************/
/******************HELPER FUNCTION*********************/
/******************************************************/
/******************************************************/


const validateEntry = (entry) => {
  const regEx = /^[a-zA-Z0-9 ]{5,30}$/;
  return regEx.test(entry);
}

const handleInvalidEntry = (entry, className, errorMessage, disabled) => {
  let newClassName = className;
  let newErrorMessage = errorMessage;
  let newDisabled = disabled;

  if (validateEntry(entry)) {
    return (
      {newClassName: "valid",
      newErrorMessage: "",
      newDisabled: false}
    )
  } else {

    if (entry === "") {

      return(
        {newClassName: "normal",
        newErrorMessage: "",
        newDisabled: true}
      )

    } else {

      return(
        {newClassName: "invalid",
        newErrorMessage: "Entry must be alphanumerical and between 5-30 characters",
        newDisabled: true}
      )

    }
  }
}


/******************************************************/
/******************************************************/
/******************************************************/
/********************REACT STUFF***********************/
/******************************************************/
/******************************************************/


class App extends React.Component {
  constructor(props){
    super(props)
    // this.changeHandler = this.changeHandler.bind( this );
  }

  state = {
    list : [],
    word : "",
    className: "normal",
    errorMessage: "",
    disabled: true,
    deleteItemList: []
  }

  handleChange = (newWord,newDisabled,newClassName,newErrorMessage) => {
    this.setState({
      word: newWord,
      disabled: newDisabled,
      className: newClassName,
      errorMessage: newErrorMessage
    })
  }

  updateList = (newList,newWord) => {
    this.setState({
      list: newList,
      word: newWord
    })
  }

  handleDelete = (newList, newDeleteItemList) => {
    this.setState({
      list: newList,
      deleteItemList: newDeleteItemList
    })
  }

  handleEdit = () => {
    this.setState({
      list: newList
    })
  }

  render () {
    return (
      <React.Fragment>
        <Form onChange={this.handleChange} onSubmit={this.updateList} word={this.state.word} className={this.state.className} disabled={this.state.disabled} errorMessage={this.state.errorMessage} list={this.state.list}/>
        <List list={this.state.list} deleteItemList={this.state.deleteItemList} onDelete={this.handleDelete} onEdit={this.handleEdit} />
        <DeleteItemList deleteItemList={this.state.deleteItemList} />
      </React.Fragment>      
    )
  }
}

class Form extends React.Component {

  handleChange = (className, errorMessage, disabled, event) => {

    let entry = event.target.value;

    let newClassName = handleInvalidEntry(entry, className, errorMessage, disabled).newClassName;
    let newErrorMessage = handleInvalidEntry(entry, className, errorMessage, disabled).newErrorMessage;
    let newDisabled = handleInvalidEntry(entry, className, errorMessage, disabled).newDisabled;

    this.props.onChange(entry,newDisabled,newClassName,newErrorMessage);

  }

  handleClick = (word, list) => {
    console.log("clicked!");
    let newWord = word;
    let newList = [...list,newWord];
    console.log("newList",newList);
    newWord = "";

    console.log("newWord", newWord);
    console.log("newList",newList);

    this.props.onSubmit(newList,newWord);
  }

  handleKeyUp = (word, list, e) => {
    console.log("keyup!");
    if (validateEntry(e.target.value) && e.keyCode == '13') {
      this.handleClick(word, list);
    }
  }

  render () {
    return (
      <React.Fragment>
        <input 
          onChange={(e)=>{
            this.handleChange(this.props.className, this.props.errorMessage, this.props.disabled, e)
          }} 
          value={this.props.word} 
          className={this.props.className} 
          onKeyUp={(e)=>{
            this.handleKeyUp(this.props.word, this.props.list, e)
          }} 
        />

        <button 
          className="btn btn-primary" 
          onClick={()=>{this.handleClick(this.props.word, this.props.list)}} 
          style={{marginLeft: "4px"}} 
          type="button" 
          disabled={this.props.disabled} 
        >Add item</button>

        <ErrorMessage errorMessage={this.props.errorMessage}/>
      </React.Fragment>
    )
  }
}


class ErrorMessage extends React.Component {
  render () {
    return (
      <p className="error-message">{this.props.errorMessage}</p>
    );
  }
}


class List extends React.Component {

  render() {
      let toDoList = this.props.list.map((item,index) => {
        return (
          <ToDoItem key={item+index} item={item} index={index} list={this.props.list} onDelete={this.props.onDelete} deleteItemList={this.props.deleteItemList} onEdit={this.props.onEdit}/>
        );
      })

      return (
        <div>
          <h5>To Do List:</h5>
          <table>
            <tbody>{toDoList}
            </tbody>
          </table>
        </div>
      );
  }
}

class ToDoItem extends React.Component {
  
  handleRemove = (index, list, deleteItemList) => {
    const newList = list;
    const newDeleteItemList = deleteItemList;
    newDeleteItemList.push(newList.splice(index,1));
    this.props.onDelete(newList, newDeleteItemList);
  }

  handleEdit = (index, list) => {
    const newList = list;
    this.props.onEdit(newList);
  }

  render () {
    return (
      <tr key={"row"+this.props.item+this.props.index} className="d-flex">

        <td 
          className="col-sm-9" 
          key={"data-col1"+this.props.item+this.props.index}
        >
          {this.props.item}
          <input type="text" value={this.props.item} style={{visibility:"hidden"}} />
        </td>

        <td 
          className="col-sm" 
          key={"data-col2"+this.props.item+this.props.index}
        >
          <button 
            className="btn btn-success" 
            key={"button"+this.props.item+this.props.index} 
            onClick={()=>this.handleEdit(this.props.index, this.props.list)}
          >Edit
          </button>
        </td>

        <td 
          className="col-sm" 
          key={"data-col2"+this.props.item+this.props.index}
        >
          <button 
            className="btn btn-danger" 
            key={"button"+this.props.item+this.props.index} 
            onClick={()=>this.handleRemove(this.props.index, this.props.list, this.props.deleteItemList)}
          >Remove
          </button>
        </td>
      </tr>
    )
  }
}

class DeleteItemList extends React.Component {
  render () {

    const deleteItemList = this.props.deleteItemList.map((item,index) => {
        return (<li key={delete+item+index}>{item}</li>)
      })

    return (
        <div>
          <h5>Deleted items:</h5>
          <ul>{deleteItemList}</ul>
        </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);




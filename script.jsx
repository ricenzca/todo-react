
class List extends React.Component {
  constructor(props){
    super(props)
    // this.changeHandler = this.changeHandler.bind( this );
  }

  state = {
    list : [],
    word : "",
    className: "normal",
    errorMessage: "",
    disabled: true
  }

  validateEntry (entry) {
    const regEx = /^[a-zA-Z0-9 ]{5,30}$/;
    return regEx.test(entry);
  }

  handleInvalidEntry (entry) {
    let newClassName = this.state.className;
    let newErrorMessage = this.state.errorMessage;
    let newDisabled = this.state.disabled;

    if (this.validateEntry(entry)) {
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

  handleChange = (event) => {

    let entry = event.target.value;

    console.log("handleChange entry", entry);

    let newClassName = this.handleInvalidEntry(entry).newClassName;
    let newErrorMessage = this.handleInvalidEntry(entry).newErrorMessage;
    let newDisabled = this.handleInvalidEntry(entry).newDisabled;

    this.setState({ 
      word: entry,
      className: newClassName,
      errorMessage: newErrorMessage,
      disabled: newDisabled
    });
  }

  handleClick = (e) => {
    console.log("clicked!");
    let newList = this.state.list;
    let newWord = this.state.word;
    newList.push(newWord);
    newWord = "";

    console.log("newWord", newWord);
    console.log("newList",newList);

    this.setState({
      list: newList,
      word: newWord
    })
  }

  handleKeyUp = (e) => {
    console.log("keyup!");
    if (this.validateEntry(event.target.value) && e.keyCode == '13') {
      this.handleClick();
    }
  }

  handleRemove = (index) => {
    const newList = this.state.list;
    newList.splice(index,1);
    this.setState({list:newList});
  }

  render() {
      // render the list with a map() here
  //    console.log('this.state.list',this.state.list);
      let toDoList = this.state.list.map((item,index) => {
        return (
          <tr key={"row"+item+index} className="d-flex">
            <td className="col-9" key={"data-col1"+item+index}>{item}</td>
            <td className="col-3" key={"data-col2"+item+index}><button className="btn btn-danger" key={"button"+item+index} onClick={()=>this.handleRemove(index)}>Remove</button></td>
          </tr>
        );
      })
    //  console.log(toDoList);
   //   console.log("rendering");

      return (
        <React.Fragment>
        <div className="list">
            <input onChange={this.handleChange} value={this.state.word} className={this.state.className} onKeyUp={this.handleKeyUp} />
            <button className="btn btn-primary" onClick={this.handleClick} style={{marginLeft: "4px"}} type="button" disabled={this.state.disabled} >Add item</button>
            <p className="error-message">{this.state.errorMessage}</p>
        </div>
        <h5>To Do List:</h5>
        <table><tbody>{toDoList}</tbody></table>
        </React.Fragment>

      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);


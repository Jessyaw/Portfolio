import React, { Component } from 'react'
import { db } from '../dexie/DB'
import WithRouter from '../navigate/WithRouter'
import { Color } from '../Colors'
import NavHeader from '../component/NavHeader'
import { Fa0 } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { decryption } from '../dexie/EncodeDecode'


class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passage: "",
      isEdit: false,
      ID: null,
      heading: null,
      isSaved: false,
    }
    this.contentRef = React.createRef();
  }

  componentDidMount = () => {
    this.fetchStory(this.props.location?.state?.ID);
    this.setState({
      ID: this.props.location?.state?.ID,
      heading: this.props.location?.state?.heading
    })
  }

  fetchStory = async (id) => {
    try {
      const story = await db.journal.get(id);
      let allStory = await db.journal.toArray();
      let decode = decryption(allStory);
      if (story) {
        this.setState({
          passage: story.story
        })
      }
      else {

        await db.journal.put({ id: id, story: "" })
      }
    }
    catch (e) {
    }


  }

  onSaveClick = async () => {
    this.setState({ isEdit: false, isSaved: false })
    let pass = this.contentRef.current.innerText.trim();

    if (pass != '') {
      let id = this.props.location?.state?.ID
      await db.journal.update(id, { story: pass });
      //  await this.fetchStory();

      this.setState({
        passage: pass,
      })
    }
  }
  onHandleInput = async () => {
    let pass = this.contentRef.current.innerHTML;
    this.setState({ isSaved: true })
    try {
      if (pass.trim() !== '') {
        let id = this.props.location?.state?.ID
        await db.journal.update(id, { story: pass });

      }
    }
    catch (e) {
    }


  };
  onEdit = () => {
    this.setState({ isEdit: true, isSaved: true })
  }
  onBlur = () => {
    this.setState({ isEdit: false })
  }
  onRedirect = () => {
    this.props.navigate('/journalsList')
  }
  render() {
    return (
      <div>


        <div className='heading center' style={{ color: Color.whiteFont }}>
          {this.state.heading}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0px 16px', margin: '12px 0px' }}>
          <FaRegSave onClick={() => this.onSaveClick(this.state.passage)} color={this.state.isSaved ? 'blue' : '#0d0131'} size={23} style={{ margin: '0px 12px' }} />
          <MdEdit onClick={this.onEdit} color={this.state.isEdit ? '#0d0131' : 'blue'} size={23} style={{ margin: '0px 12px' }} />
          <button onClick={this.onRedirect} style={{ border: 'none', borderRadius: '7px', background: Color.theme, height: '34px', width: '97px', color: Color.whiteFont, }}>Back</button>

        </div>


        <div
          onBlur={this.onBlur}
          onInput={this.onHandleInput}
          ref={this.contentRef}
          contentEditable={this.state.isEdit}
          style={{
            outline: 'none', padding: '20px', backgroundColor: '#0d0131', margin: '20px', borderRadius: '7px',
            // boxShadow: '0px 7px 25px #80008077'
            color: Color.whiteFont,
          }}>
          {this.state.passage || ''}
        </div>


      </div>
    )
  }
}

export default WithRouter(Journal)

import EditableRow from './index';
import React from 'react';

export default class IssueItem extends EditableRow {
        
       /*     { type: 'hidden', name:'_id', value: item._id},
            { type: 'hidden', name:'retrospective', value: this.props.match.params.id},
            { type: 'text', name:'name', value: item.name, editable:true, validation: {required: true, rules:[]}},
            { type: 'textarea', name: 'description', value: item.description, editable: true },
            { type: 'select', name:'type', value: item.type, editable:true, 
                model: { list: this.state.types, choice: item.type}, validation: {required: true, rules: []}}
            
         [2] name
         [3] area
         [4] select
            
    renderFields(){
        return this.fields.map(
                    (field,i)=>{
                        if(field){
                            return (<td key={i}>{field}</td>);
                        } else {
                            return (null);
                        }
                    }
                );
    }*/
        
    render(){
        console.log("fields",this.fields);
        this.createComponents();
        if(this.props.addMode && !this.state.editMode){
            return (<button  className="rowButton input" onClick={this.onChange.bind(this)} >Add</button>);
        } else {
            return (
                    <div className="IssueItem">
                        <div className={this.state.editMode?"editMode":"reviewMode"}>
                            {this.fields[2]}{this.fields[4]}
                        </div>
                        <div className="description">{this.fields[3]}</div>
                                
                        <div className="controlButtons">
                                {this.renderButtons()}
                                {this.renderOnDeleteButton()}
                        </div>
                        {this.innerMessages()}
                    </div>
              );  
        }
    }
}
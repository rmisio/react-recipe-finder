import React, { Component } from "react";

import "../styles/recipe-form.scss";

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      photoUrl: this.props.recipe.photo.src,
      validatingPhotoUrl: false,
      submittingForm: false
    }
  }

  parseForm() {
    return {
      'title': this.refs.title.getDOMNode().value,
      'photoUrl': this.refs.photoUrlInput.getDOMNode().value,
      'description': this.refs.description.getDOMNode().value
    }
  }

  disableForm() {
    this.refs.title.getDOMNode().disabled = true;
    this.refs.photoUrl.getDOMNode().disabled = true;
    this.refs.description.getDOMNode().disabled = true;
    this.refs.btnSubmit.getDOMNode().disabled = true;
  }

  enableForm() {
    this.refs.title.getDOMNode().disabled = false;
    this.refs.photoUrl.getDOMNode().disabled = false;
    this.refs.description.getDOMNode().disabled = false;
    this.refs.btnSubmit.getDOMNode().disabled = false;
  }

  formSubmit(e) {
    const formData = this.parseForm();
    
    e.preventDefault();

    this.validate(formData).then(() => {
      const recipe = {...formData};

      delete recipe['photoUrl'];
      
      window.meatballs = this.refs.photoImg.getDOMNode();

      this.props.onRecipeSave({
        ...recipe,
        id: this.props.recipe.id,
        photo: {
          src:  this.refs.photoImg.getDOMNode().src,
          height: this.refs.photoImg.getDOMNode().naturalHeight,
          width: this.refs.photoImg.getDOMNode().naturalWidth
        }
      });
    }).catch(() => {
      alert('There are one or more errors. Please fix.');
    });
  }

  validate(fields) {
    let errors = { ...this.state.errors };
    let promise;
    let photoUrlPromise;

    if (!fields) return;

    if (fields.hasOwnProperty('title')) {
      if (fields.title == '') {
        errors.title = 'Title is required.';
      } else {
        delete errors['title'];
      }      
    }

    if (fields.hasOwnProperty('description')) {
      if (fields.description == '') {
        errors.description = 'Description is required.';
      } else {
        delete errors['description'];
      }      
    }

    if (fields.hasOwnProperty('photoUrl')) {
      if (fields.photoUrl) {
        photoUrlPromise = new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () => {
            resolve();
          }

          img.onerror = (e) => {
            reject(e);
          }

          img.src = fields.photoUrl;
        });
      } else {
        delete errors['photoUrl'];
      }
    }    

    promise = photoUrlPromise || new Promise((resolve, reject) => {
      resolve();
    });

    return new Promise((resolve, reject) => {
      promise.then(() => {
        fields.photoUrl && delete errors['photoUrl'];
      }).catch((e) => {
        errors.photoUrl = 'There was a problem obtaining the photo. Please ensure the url is correct.'
      }).then(() => {
        let fieldErrs = {};

        this.setState({ errors });

        for (let err in errors) {
          if (fields.hasOwnProperty(err)) {
            fieldErrs[err] = errors[err];
          }
        }

        if (Object.keys(fieldErrs).length) {
          reject(fieldErrs);
        } else {
          resolve();
        }      
      });
    });
  }

  setPhotoUrl(url) {
    this.setState({
      photoUrl: '',
      validatingPhotoUrl: true
    });

    this.validate({ photoUrl: url }).then(() => {
      this.setState({
        photoUrl: url
      });
    }).catch((errors) => {
      // pass
    }).then(() => {
      this.setState({
        validatingPhotoUrl: false
      });      
    });
  } 

  fieldChange(name, e) {
    let fieldObj = {};
    
    fieldObj[name] = e.target.value;

    if (e.target == this.refs.photoUrlInput.getDOMNode()) {
      this.setPhotoUrl(e.target.value);
      return;
    }

    this.validate(fieldObj).catch(() => {
      // pass
    });
  }

  render() {
    const errorComponents = {};
    
    let photo = '';

    for (let field in this.state.errors) {
      errorComponents[field] = <div className="error-msg">{this.state.errors[field]}</div>;
    }

    if (this.state.photoUrl) {
      photo = <div className="photo"><img src={this.state.photoUrl} ref="photoImg" /></div>
    }

    return (
      <form className="recipe-form" onSubmit={this.formSubmit.bind(this)}>
        { errorComponents.title ? errorComponents.title : ''}
        <label className={errorComponents.title && 'has-error'}>
          Title:
          <input type="text"
                 placeholder="Enter a title"
                 ref="title"
                 onChange={this.fieldChange.bind(this, 'title')}
                 defaultValue={this.props.recipe.title} />
        </label>
        { errorComponents.description ? errorComponents.description : ''}
        <label className={'lblDescription' + (errorComponents.description ? 'has-error' : '')}>
          Description:
          <textarea placeholder="Enter a description"
                    ref="description"
                    onChange={this.fieldChange.bind(this, 'description')}
                    defaultValue={this.props.recipe.description} />
        </label>
        { errorComponents.photoUrl ? errorComponents.photoUrl : ''}
        <label className={errorComponents.photo && 'has-error'}>
          Photo:
          <input type="text"
                 placeholder="Enter a photo url"
                 ref="photoUrlInput"
                 onChange={this.fieldChange.bind(this, 'photo')}
                 defaultValue={this.props.recipe.photo.src} />
          {this.state.validatingPhotoUrl ? 'Validating...' : ''}
        </label>
        {photo}
        <button type="submit" ref="btnSubmit">Submit</button>
        {this.state.submittingForm ? 'Submitting...' : ''}
      </form>
    )
  }
}

RecipeForm.defaultProps = {
  recipe: {
    id: new Date().getTime(),
    title: '',
    description: '',
    photo: {
      src: ''
    }
  }
};


export default RecipeForm;
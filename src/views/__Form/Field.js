export class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.Data.default };
    this.handleChange = this.handleChange.bind(this);
    this.isCheckbox = this.props.Data.type === 'checkbox';
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.Data.default = event.target.value;
  }

  handleCheckbox(event) {
    this.setState({ value: event.target.checked });
    this.props.Data.default = event.target.checked;
  }

  render() {
    var InputObject = (!this.isCheckbox) ?
      <div>
        <label htmlFor={this.props.Data.id}>{this.props.Data.titulo}</label>
        <input name={this.props.Data.id} id={this.props.Data.id} type={this.props.Data.type} value={this.state.value} onChange={this.handleChange.bind(this)} />
      </div>
      :
      <div>
        <label htmlFor={this.props.Data.id}>{this.props.Data.titulo}</label>
        <input name={this.props.Data.id} id={this.props.Data.id} type="checkbox" onChange={this.handleCheckbox.bind(this)} checked={this.state.value} />
      </div>;

    return (InputObject);
  }
}
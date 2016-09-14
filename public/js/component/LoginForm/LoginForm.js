require('./style.scss');

var LoginForm = React.createClass({
    getInitialState: function () {
        return {name: "", password: ""};
    },
    valueChange: function (key, event) {
        this.state[key] = event.target.value;
        this.setState(this.state);
    },
    alertValue: function (key) {
        alert("(●｀∀´●)╯╰(●’◡’●)╮(●’◡’●)ﾉ");
    },
    render: function () {
        var login = {
            name: this.state.name,
            password: this.state.password
        };

        return (
            <form noValidate className="login-form">
                <h3>login ヽ(･ω･｡)ﾉ</h3>

                <div>
                    <input type="text" autoComplete="off" value={login.name}
                           onChange={this.valueChange.bind(this, 'name')}/>
                    <input type="text" autoComplete="off" value={login.password}
                           onChange={this.valueChange.bind(this, 'password')}/>
                    <button type="button" onClick={this.alertValue}>=≡Σ((( つ•̀ω•́)つ</button>
                </div>
                <div>输出:<br/>{login.name}<br/>{login.password}</div>
            </form>

        );
    }
});

module.exports = LoginForm;
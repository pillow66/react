/**
 * Created by 1mango01 on 16/9/10.
 */

(function () {
    ReactDOM.render(
        <h1>Hello, world!</h1>,
        $("#content").get(0)
    );
})();

(function () {
    var names = ['1', '2'];
    ReactDOM.render(
        <div>
            {
                names.map(function (n) {
                    return <div>{n}</div>
                })
            }
        </div>,
        $("#content").get(0)
    );
})();

(function () {
    var arr = [
        <h1>hello</h1>,
        <h2>world</h2>
    ];
    ReactDOM.render(
        <div>{arr}</div>,
        $("#content").get(0)
    );
})();

(function () {
    //组件必须大写
    var HelloMessage = React.createClass({
        render: function () {
            //属性class要写成className,for要写成htmlFor
            return (
                <h1 className={this.props.className} htmlFor={this.props.htmlFor}>
                    hello {this.props.name}, age {this.props.age}
                </h1>
            );
        }
    });

    var age = 6;
    ReactDOM.render(
        <HelloMessage className="class" htmlFor="label1" name="66" age={age}/>,
        $("#content").get(0)
    );
})();

(function () {
    var NotesList = React.createClass({
        render: function () {
            return (
                <ol>
                    {
                        //this.props.children
                        //1.组件没有子节点,为undefined
                        //2.有一个子节点,为object
                        //3.多个子节点,为[]

                        //React.Children.map遍历子节点,不用担心数据类型是undefined,还是object
                        React.Children.map(this.props.children, function (child) {
                            return <li>{child}</li>
                        })
                    }
                </ol>
            );
        }
    });

    ReactDOM.render(
        <NotesList>
            <span key="1">hello</span>
            <span key="2">world</span>
        </NotesList>,
        $("#content").get(0)
    );
})();

(function () {
    var MyTitle = React.createClass({
        //getDefaultProps设置默认值
        getDefaultProps: function () {
            return {name: '66'};
        },
        propTypes: {
            //必须是字符串
            title: React.PropTypes.string.isRequired
        },
        render: function () {
            return <h1>{this.props.title + this.props.name}</h1>
        }
    });

    var data = 123;
    ReactDOM.render(
        <MyTitle title={data}/>,
        $("#content").get(0)
    );
})();

(function () {
    var MyComponent = React.createClass({
        //this.refs[refName]返回真实DOM,必须等虚拟DOM插入文档后,才可使用
        txtNameFocus: function () {
            this.refs.txtName.focus();
        },
        render: function () {
            return (
                <div>
                    <input type="text" ref="txtName"/>
                    <input type="button" value="获取焦点" onClick={this.txtNameFocus}/>
                </div>
            )
        }
    });

    ReactDOM.render(
        <MyComponent/>,
        $("#content").get(0)
    );
})();

(function () {
    //this.props主要表示那些一旦定义,不再变更的属性
    //this.state主要表示会随着用户交互变化的属性
    //React将组件看成一个状态机,开始有个初始状态,然后用户交互,导致状态变化,触发渲染UI

    var LikeButton = React.createClass({
        //定义初始状态对象,可通过this.state属性读取
        getInitialState: function () {
            return {like: false};
        },
        toggleLike: function () {
            //this.setState修改状态值,每次修改后自动调用render渲染组件
            this.setState({liked: !this.state.liked});
        },
        render: function () {
            var text = this.state.liked ? 'like' : 'unlike';
            return (
                <p onClick={this.toggleLike}>
                    {text}
                </p>
            );
        }
    });

    ReactDOM.render(
        <LikeButton/>,
        $("#content").get(0)
    );
})();

(function () {
    var Input = React.createClass({
        getInitialState: function () {
            return {value: '66'};
        },
        valueChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            //为实现双向数据绑定,input控件的值不可以通过this.props.value读取,而要定义onChange事件回调,通过event.target.value读取
            var v = this.state.value;
            return (
                <div>
                    <input type="text" value={v} onChange={this.valueChange}/>

                    <p>{v}</p>
                </div>
            );
        }
    });

    ReactDOM.render(
        <Input/>,
        $("#content").get(0)
    );
})();

(function () {
    /*
     * 组件生命周期分2个状态
     * Mounting:已插入真实DOM
     * Updating:正在被重新渲染
     * Unmounting:已移出真实DOM
     *
     * React为每个状态提供了2种函数处理
     * will:函数进入状态前调用
     * did:函数进入状态后调用
     *
     * 共计5种处理函数
     * componentWillMount()
     * componentDidMount()
     * componentWillUpdate(object nextProps, object nextState)
     * componentDidUpdate(object prevProps, object prevState)
     * componentWillUnmount()
     *
     * 此外还提供2种特殊状态处理函数
     * componentWillReceiveProps(object nextProps):已加载组件收到新的参数时调用
     * shouldComponentUpdate(object nextProps, object nextState):组件判断是否重新渲染时调用
     */

    var Hello = React.createClass({
        getInitialState: function () {
            return {opacity: 1.0};
        },
        componentDidMount: function () {
            var changeOpacityFun = (function () {
                var o = this.state.opacity;
                o -= .05;

                this.setState({opacity: o});
            }).bind(this);

            this.timer = setInterval(changeOpacityFun, 100);
        },
        componentWillUnmount: function () {
            clearInterval(this.timer);
            console.log("destroy");
        },
        render: function () {
            return (
                //绑定style要用{{}},因为React组件样式是一个对象
                <div style={{opacity:this.state.opacity}}>
                    Hello {this.props.name}
                </div>
            );
        }
    });

    ReactDOM.render(
        <Hello name="66"/>,
        $("#content").get(0)
    );
})();

(function () {
    var UserInfo = React.createClass({
        getInitialState: function () {
            return {loading: true, error: null, data: {name: "", age: ""}};
        },
        componentDidMount: function () {
            var success = (function (data) {
                //data数据结构:{name:"lulu", age:66}
                if (this.isMounted()) {
                    this.setState({loading: false, data: data});
                }
            }).bind(this);

            getUserInfo(this.props.url).then(success);
        },
        render: function () {
            if (this.state.loading) {
                return (<span>loading...</span>);
            }
            else if (this.state.error) {
                return (<span>error...</span>);
            }
            else if (!this.state.loading) {
                return (
                    <div>
                        name:{this.state.data.name} age:{this.state.data.age}
                    </div>
                );
            }
        }
    });

    //请求数据
    function getUserInfo(url) {
        var dfd = $.Deferred();

        $.get(url, function (data) {
            dfd.resolve(data);
        });

        return dfd.promise();
    };

    ReactDOM.render(
        <UserInfo url="../js/userInfo.json"/>,
        $("#content").get(0)
    );
})();
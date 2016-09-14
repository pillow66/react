require('./style.scss');

var list = [
    {id: 1, name: "66", age: 1},
    {id: 2, name: "lulu", age: 2},
    {id: 3, name: "6lu", age: 3}
];

var InfoList = React.createClass({
    render: function () {
        return (
            <div className="info-list">
                <h3>hello world ヽ(･ω･｡)ﾉ</h3>

                <div>
                    {
                        list.map(function (item) {
                            return <div key={item.id}>name:{item.name}-age:{item.age}</div>
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = InfoList;
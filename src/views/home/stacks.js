import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stacks extends Component {

    render() {
        return (
            <div className="fruits-block basket-block">
                <div className="basket empty">
                    {this.props.stacks.map((item, i) => {
                        return (
                            <div key={i} className={`element ${item.key}`}></div>
                        );
                    })}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    stacks: state.stacks
});

export default connect(mapStateToProps)(Stacks);

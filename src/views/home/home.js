import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { STORAGE, authStore, BASKET } from '../../helpers/index';
import { updateStack } from '../../actions/app.actions';
import { URLConfig } from '../../config/url.config';
import Stacks from './stacks';
import './home.scss';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baskets: [
                { key: BASKET.APPLE, label: BASKET.APPLE, count: 10 },
                { key: BASKET.ORANGE, label: BASKET.ORANGE, count: 10 },
                { key: BASKET.GRAPES, label: BASKET.GRAPES, count: 10 }
            ],
            errorMessage: ''
        }
    }

    /**
     * Hook to handle functionlities after component load
     */
    componentDidMount() {
        axios.get(URLConfig.homeDummyURL).then(({ data }) => console.log(data?.message));
    }

    /**
     * Handle on logout request
     */
    onLogout = () => {
        authStore.logout();

        const { history } = this.props;
        history.push('/login');
    };

    /**
     * Method to add the fruits in stack
     * @param {object} basket
     */
    addIntoStack = (basket) => {
        this.setState({
            baskets: this._getUpdatedStack(basket),
        });

        this.props.updateStack(
            [...[basket], ...this.props.stacks]
        ); // unshift logic for stacks
    };

    /**
     * Method to remove the fruits from stack
     * @param {object} basket
     */
    removeFromStack = (basket) => {
        const lastBucket = this.props.stacks[0];

        if (lastBucket?.key === basket.key) {
            this.setState({
                baskets: this._getUpdatedStack(basket, true)
            });

            this.props.updateStack(
                this.props.stacks.slice(1, this.props.stacks.length)
            ); // shift logic, remove first item from stacks
        } else {
            // Enable toast notification
            this.setState({ errorMessage: `${basket.label} is not the top item in stack` });

            setTimeout(() => {
                this.setState({ errorMessage: '' })
            }, 3 * 1000);
        }
    };

    /**
     * Update the basket item count based on the operation
     * @param {object} basket
     * @param {boolean} isAddition
     * @returns {Array}
     */
    _getUpdatedStack = (basket, isAddition = false) => {
        const baskets = this.state.baskets.map(item => {
            if (item.key === basket.key) {
                item.count = isAddition ? item.count + 1 : item.count - 1;
            }
            return item;
        });

        return baskets;
    };

    /**
     * Hook to render the DOM
     */
    render() {
        const username = JSON.parse(sessionStorage.getItem(STORAGE.USER_DETAILS))?.name;

        const toastMessage = <div className={`alert alert-danger ${this.state.errorMessage ? 'show' : ''}`}>{this.state.errorMessage}</div>;

        return (
            <main className="home-page">
                {toastMessage}

                <div className="logout">
                    <span className="username">{username}</span>
                    <button type="button" className="site-btn login-btn" onClick={this.onLogout}>Logout</button>
                </div>

                <section className="home-section">
                    <h4 className="items-title">All Items</h4>
                    <div className="fruits-block">
                        {this.state.baskets.map((basket, i) => {
                            return (
                                <div key={i} className={`basket ${basket.key}`}>
                                    <h5>{basket.label}</h5>
                                    <h5>{basket.count}</h5>
                                    <button type="button"
                                        className={
                                            `action-btn ${basket.count < 1 ? 'disabled' : ''}`
                                        }
                                        onClick={() => this.addIntoStack(basket)} >+</button>
                                    <button type="button"
                                        className={
                                            `action-btn ${basket.count === 10 ? 'disabled' : ''}`
                                        }
                                        onClick={() => this.removeFromStack(basket)} >-</button>
                                </div>
                            );
                        })}
                    </div>

                    <Stacks />
                </section>
            </main >
        );
    }
}

const mapStateToProps = (state) => ({
    stacks: state.stacks
});

const mapDispatchToProps = {
    updateStack
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

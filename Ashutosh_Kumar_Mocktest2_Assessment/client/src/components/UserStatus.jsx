import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Fetching user status...',
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({ status: 'Active User' });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const { userId } = this.props;
        return (
            <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '5px', margin: '10px', backgroundColor: '#f0f8ff' }}>
                <h3>ShopNow User Status</h3>
                <p>User ID: {userId}</p>
                <p>Status: <strong>{this.state.status}</strong></p>
            </div>
        );
    }
}

UserStatus.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserStatus;

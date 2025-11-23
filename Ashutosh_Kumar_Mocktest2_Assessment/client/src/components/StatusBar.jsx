import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Checking connection...',
            statusColor: '#ffa500',
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                status: 'System Online',
                statusColor: '#28a745'
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const { userId } = this.props;
        return (
            <div style={{
                backgroundColor: this.state.statusColor,
                color: 'white',
                padding: '8px 20px',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>
                    <strong>ShopNow Status:</strong> {this.state.status}
                </span>
                <span>User ID: {userId}</span>
            </div>
        );
    }
}

StatusBar.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default StatusBar;

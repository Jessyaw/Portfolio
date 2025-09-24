import React, { Component } from 'react'

export default class LibraryManagementSystem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideMenu: [
                { id: 1, menu: 'Dashboard', isHover: false, isSelect: false, },
                { id: 2, menu: 'Books', isHover: false, isSelect: false, },
                { id: 3, menu: 'Users', isHover: false, isSelect: false, },
                { id: 4, menu: 'Borrow/Return', isHover: false, isSelect: false, },
                { id: 5, menu: 'AI Assistant', isHover: false, isSelect: false, },
            ],
            statCards: [
                { id: 1, card: 'Total Books', count: 12, isHover: false },
                { id: 2, card: 'Total Members', count: 12, isHover: false },
                { id: 3, card: 'Books Borrowed Today', count: 12, isHover: false },
                { id: 4, card: 'Books Returned Today', count: 12, isHover: false },
                { id: 5, card: 'Overdue Books', count: 12, isHover: false },
            ],
            recentlyAddedBooks: [
                { id: 1, book: 'wonderland', isHover: false, isSelect: false },
                { id: 2, book: 'wonderland', isHover: false, isSelect: false },
                { id: 3, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
            ],
            recentlyBorrowed: [
                { id: 1, book: 'wonderland', isHover: false, isSelect: false },
                { id: 2, book: 'wonderland', isHover: false, isSelect: false },
                { id: 3, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
            ],
            overDueBooks: [
                { id: 1, book: 'wonderland', isHover: false, isSelect: false },
                { id: 2, book: 'wonderland', isHover: false, isSelect: false },
                { id: 3, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
                { id: 4, book: 'wonderland', isHover: false, isSelect: false },
            ],
            commonQS: [
                { id: 1, qs: 'Show me overdue books this week', isSelect: false },
                { id: 2, qs: 'Who borrowed the most books this month?', isSelect: false },
            ],
        }
    }

    render() {

        return (

            <div>
                {/* Header */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 2 }}>LOGO</div>
                    <div style={{ flex: 2 }}></div>
                    <div style={{ flex: 6 }}>Search</div>
                    <div style={{ flex: 2 }}>Profile</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Side bar */}
                    <div style={{ flex: 1 }}>
                        <div className='side-menu-container'>
                            {this.state.sideMenu?.map(i =>
                                <div className='side-menu-items'>
                                    {i.menu}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main content */}
                    <div style={{ flex: 5 }}>
                        <div>
                            <div className='card-conatainer'>
                                {this.state.statCards?.map(i =>
                                    <div className='stat-card'>
                                        <div>{i.card}</div>
                                        <div>{i.count}</div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div> Recently added Book</div>
                                <div className='card-conatainer'>
                                    {this.state.recentlyAddedBooks?.map(i =>
                                        <div className='stat-card'>{i.book}</div>
                                    )}
                                </div>
                                <div> Recently borrowed Book</div>
                                <div className='card-conatainer'>
                                    {this.state.recentlyBorrowed?.map(i =>
                                        <div className='stat-card'>{i.book}</div>
                                    )}
                                </div>
                                <div> Overdue</div>
                                <div className='card-conatainer'>
                                    {this.state.overDueBooks?.map(i =>
                                        <div className='stat-card'>{i.book}</div>
                                    )}
                                </div>

                                <div>Ask chat</div>
                                <div>
                                    {this.state.commonQS?.map(i =>
                                        <div>{i.qs}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

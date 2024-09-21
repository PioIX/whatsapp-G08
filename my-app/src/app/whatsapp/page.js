"use client"

import styles from "@/app/page.module.css"
import Sidebar from "@/components/Sidebar"
import Title from "@/components/Title"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Home() {



  return (
    <section style={{ backgroundColor: '#075E54' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span className="input-group-text border-0" id="search-addon">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                        <ul className="list-unstyled mb-0">
                          {/* Sample Chat List */}
                          {[
                            {
                              name: 'Marie Horwitz',
                              message: 'Hello, Are you there?',
                              time: 'Just now',
                              avatar: 'ava1-bg.webp',
                              unread: 3,
                            },
                            {
                              name: 'Alexa Chung',
                              message: 'Lorem ipsum dolor sit.',
                              time: '5 mins ago',
                              avatar: 'ava2-bg.webp',
                              unread: 2,
                            },
                            // Add more chat items here...
                          ].map((chat, index) => (
                            <li className="p-2 border-bottom" key={index}>
                              <a href="#!" className="d-flex justify-content-between">
                                <div className="d-flex flex-row">
                                  <div>
                                    <img
                                      src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/${chat.avatar}`}
                                      alt="avatar"
                                      className="d-flex align-self-center me-3"
                                      width="60"
                                    />
                                    <span className={`badge ${chat.unread > 0 ? 'bg-danger' : 'bg-success'} badge-dot`}></span>
                                  </div>
                                  <div className="pt-1">
                                    <p className="fw-bold mb-0">{chat.name}</p>
                                    <p className="small text-muted">{chat.message}</p>
                                  </div>
                                </div>
                                <div className="pt-1">
                                  <p className="small text-muted mb-1">{chat.time}</p>
                                  {chat.unread > 0 && (
                                    <span className="badge bg-danger rounded-pill float-end">{chat.unread}</span>
                                  )}
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-8">
                    <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                      {/* Sample Chat Messages */}
                      {[
                        {
                          avatar: 'ava6-bg.webp',
                          message: 'Hola bro',
                          time: '12:00 PM | Aug 13',
                          sent: false,
                        },
                        {
                          avatar: 'ava1-bg.webp',
                          message: 'Hola yanfri',
                          time: '12:00 PM | Aug 13',
                          sent: true,
                        },
                        // Add more messages here...
                      ].map((msg, index) => (
                        <div className={`d-flex flex-row justify-content-${msg.sent ? 'end' : 'start'}`} key={index}>
                          {!msg.sent && (
                            <img
                              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLmNIT4bdP5jJ9WCOGGAXFtFXH2uXKzedyQ&s`}
                              alt="avatar"
                              style={{ width: '45px', height: '100%' }}
                            />
                          )}
                          <div>
                            <p className={`small p-2 ${msg.sent ? 'me-3' : 'ms-3'} mb-1 rounded-3`}
                              style={{ backgroundColor: msg.sent ? '#25D366' : '#F1F0F0', color: msg.sent ? 'white' : 'black' }}
                            >
                              {msg.message}
                            </p>
                            <p className={`small ${msg.sent ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted`}>{msg.time}</p>
                          </div>
                          {msg.sent && (
                            <img
                              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHTQ4hE8DvEq00WWWeHZJxs9IOKteXl60-w&s`}
                              alt="avatar"
                              style={{ width: '45px', height: '100%' }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHTQ4hE8DvEq00WWWeHZJxs9IOKteXl60-w&s"
                        alt="avatar 3"
                        style={{ width: '40px', height: '100%' }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type message"
                      />
                      <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                      <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                      <a className="ms-3" href="#!"><i className="fas fa-paper-plane"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
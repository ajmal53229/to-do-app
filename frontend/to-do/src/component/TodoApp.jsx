import { useEffect, useState } from 'react';

import axios from "axios";
 
export default function TodoApp({tasks , fetchTasks}) {

 
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed

  const sendata = async (task)=>{
    try {
      const res = await axios.post("http://localhost:7000/task" , task,{
        withCredentials: true
      })
      }
    catch (error) {
      console.log(error.message)
    }
  }

  const addTask = async () => {
    if (!input.trim()) return;
    const NewTask = { title: input.trim(), completed: false }
    setInput('');
    sendata(NewTask)
    await fetchTasks()
  };

  const toggleTask = async (_id) => {

    try {
      const res = await axios.post("http://localhost:7000/update" , {_id},{
        withCredentials: true
      })
      await fetchTasks()

      }
    catch (error) {
      console.log(error.message)
    }

  };

  const deleteTask = async (_id) => {

    try {
      const res = await axios.post("http://localhost:7000/delete" , {_id},{
        withCredentials: true
      })
      await fetchTasks()
      }
    catch (error) {
      console.log(error.message)
    }

  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const pending = tasks.filter(t => !t.completed).length;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>Tasks</h2>
        <span style={{ fontSize: 14, color: '#888' }}>{pending} pending</span>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{
            flex: 1, padding: '10px 14px', border: '1px solid #e0e0e0',
            borderRadius: 10, fontSize: 16, outline: 'none'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 18px', border: 'none', borderRadius: 10,
            background: '#111', color: '#fff', fontSize: 16, fontWeight: 500, cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 8, border: 'none',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              background: filter === f ? '#111' : 'transparent',
              color: filter === f ? '#fff' : '#888'
            }}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'completed'}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#bbb' }}>
          <p>No tasks here yet</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(task => (
            <li
              key={task._id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 10,
                border: '1px solid #e8e8e8', background: '#fafafa'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                  style={{ width: 20, height: 20, accentColor: '#111', cursor: 'pointer', flexShrink: 0 }}
                />
                <span style={{
                  fontSize: 15,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#aaa' : '#111',
                  flex: 1
                }}>
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: '6px 10px', border: 'none', background: 'transparent',
                  color: '#c00', borderRadius: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: 500
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
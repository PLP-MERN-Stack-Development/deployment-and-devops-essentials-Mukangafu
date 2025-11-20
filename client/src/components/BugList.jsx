export default function BugList({ bugs, updateBugStatus, removeBug }) {
  if (!bugs.length) {
    return <p className="text-gray-600 text-center">No bugs reported yet.</p>;
  }

  return (
    <div className="space-y-4">
      {bugs.map((bug) => (
        <div 
          key={bug._id}
          className="bg-gray-100 p-4 rounded shadow"
        >
          <h3 className="text-lg font-bold">{bug.title}</h3>
          <p className="text-sm text-gray-700">{bug.description}</p>

          <div className="mt-3 flex justify-between items-center">
            <span 
              className={`px-3 py-1 rounded text-white ${
                bug.status === "resolved" ? "bg-green-600" :
                bug.status === "in-progress" ? "bg-yellow-500" :
                "bg-red-600"
              }`}
            >
              {bug.status}
            </span>

            <div className="flex gap-2">
              <button 
                onClick={() => updateBugStatus(bug._id, "in-progress")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                In Progress
              </button>

              <button 
                onClick={() => updateBugStatus(bug._id, "resolved")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Resolve
              </button>

              <button 
                onClick={() => removeBug(bug._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

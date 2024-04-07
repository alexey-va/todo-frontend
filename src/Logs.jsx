import { useState, useEffect, useRef } from "react";

function CustomTextarea({ value, hideTimestamp, hideThread, hideLevel, hideLogger, hideMessage }) {
  const textareaRef = useRef(null);



  useEffect(() => {
    // Scroll the textarea to the bottom on page load
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [value]);

  const parseLogMessage = (log) => {
    const regex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}) \[(.*?)\] (\S+) (.+?) - (.*)$/;
    const matches = log.match(regex);
    if (!matches) {
      return <span>{log}</span>;
    }

    const timestamp = matches[1];
    const thread = matches[2];
    const level = matches[3];
    const logger = matches[4];
    const message = matches[5];

    const renderTimestamp = hideTimestamp ? null : <span style={{ color: 'gray' }}>{timestamp}</span>;
    const renderThread = hideThread ? null : <span style={{ color: 'blue', fontWeight: 'bold' }}>[{thread}]</span>;
    let renderLevel;
    switch (level) {
      case 'INFO':
        renderLevel = hideLevel ? null : <span style={{ color: 'blue', fontWeight: 'bold' }}>{level}</span>;
        break;
      case 'WARN':
        renderLevel = hideLevel ? null : <span style={{ color: 'orange', fontWeight: 'bold' }}>{level}</span>;
        break;
      case 'ERROR':
        renderLevel = hideLevel ? null : <span style={{ color: 'red', fontWeight: 'bold' }}>{level}</span>;
        break;
      case 'DEBUG':
        renderLevel = hideLevel ? null : <span style={{ color: 'green', fontWeight: 'bold' }}>{level}</span>;
        break;
      default:
        renderLevel = hideLevel ? null : <span style={{ fontWeight: 'bold' }}>{level}</span>;
    }
    const renderLogger = hideLogger ? null : <span>{logger}</span>;
    const renderMessage = hideMessage ? null : <span>{message}</span>;

    return (
      <div className="mb-0 whitespace-nowrap">
        {renderTimestamp}{' '}
        {renderThread}{' '}
        {renderLevel}{' '}
        {renderLogger}{' '}
        -{' '}
        {renderMessage}
      </div>
    );
  };

  const renderLogs = () => {
    return value.split('\n').map((line, index) => (
      <div key={index}>{parseLogMessage(line)}</div>
    ));
  };

  return (
    <div className="no-scrollbar custom-textarea overflow-auto border border-gray-300 p-2 h-full w-full" ref={textareaRef}>
      {renderLogs()}
    </div>
  );
}

export default function Logs() {
  const [logs, setLogs] = useState("");
  const [hideTimestamp, setHideTimestamp] = useState(false);
  const [hideThread, setHideThread] = useState(true);
  const [hideLevel, setHideLevel] = useState(false);
  const [hideLogger, setHideLogger] = useState(true);
  const [hideMessage, setHideMessage] = useState(false);

  const [hostUrl, setHostUrl] = useState('');

  useEffect(() => {
    console.log(window.location.origin)
    setHostUrl(window.location.origin);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(
          "https://todo-back.alexeyav.ru/api/v1/logs?from=0",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }
        const data = await response.json();
        const formattedLogs = data.map((log) => log.message).join("\n");
        setLogs(formattedLogs);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch logs initially
    fetchLogs();

    // Fetch logs every second
    const intervalId = setInterval(fetchLogs, 1000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#BCCAB8]">
      <div className="mx-10 flex h-[90%] w-full flex-col rounded-md bg-white p-4 drop-shadow-2xl">
        <div className="flex flex-row mb-4">
          <a href={`${hostUrl}`} className="flex justify-center items-center">
            <div
              className={`px-2 flex items-center justify-center rounded-md bg-gray-500 py-1 text-white opacity-90 transition-all hover:bg-gray-600`}
            >
              Back to App
            </div>
          </a>
        </div>

        <div className="mb-2 flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              checked={!hideTimestamp}
              onChange={() => setHideTimestamp((prev) => !prev)}
            />
            Show Timestamp
          </label>
          <label>
            <input
              type="checkbox"
              checked={!hideThread}
              onChange={() => setHideThread((prev) => !prev)}
            />
            Show Thread
          </label>
          <label>
            <input
              type="checkbox"
              checked={!hideLevel}
              onChange={() => setHideLevel((prev) => !prev)}
            />
            Show Level
          </label>
          <label>
            <input
              type="checkbox"
              checked={!hideLogger}
              onChange={() => setHideLogger((prev) => !prev)}
            />
            Show Logger
          </label>
          <label>
            <input
              type="checkbox"
              checked={!hideMessage}
              onChange={() => setHideMessage((prev) => !prev)}
            />
            Show Message
          </label>
        </div>
        <CustomTextarea
          value={logs}
          hideTimestamp={hideTimestamp}
          hideThread={hideThread}
          hideLevel={hideLevel}
          hideLogger={hideLogger}
          hideMessage={hideMessage}
        />
      </div>
    </div>
  );
}

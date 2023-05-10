import { OpenVidu, Publisher, Session, StreamManager } from "openvidu-browser";

const [OV, setOV] = useState(null);
const [session, setSession] = useState(null);
const [publisher, setPublisher] = useState(null);
const [mainStreamManager, setMainStreamManager] = useState(null);
const [streamManagers, setStreamManagers] = useState([]);

useEffect(() => {
  setOV(new OpenVidu());
}, []);

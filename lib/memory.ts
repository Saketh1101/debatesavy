type DebateRecord = {
  id: string;
  title: string;
  topic: string;
  mode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  participants: Array<{ id: string; name: string }>;
  arguments: Array<any>;
  analysis?: any;
};

const debates = new Map<string, DebateRecord>();

export function createDebate(props: { id: string; title: string; topic: string; mode?: string; userId: string; userName?: string }) {
  const now = new Date().toISOString();
  const d: DebateRecord = {
    id: props.id,
    title: props.title,
    topic: props.topic,
    mode: props.mode || 'friendly',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    participants: [{ id: props.userId, name: props.userName || 'Demo User' }],
    arguments: [],
  };
  debates.set(d.id, d);
  return d;
}

export function getDebate(id: string) {
  return debates.get(id) || null;
}

export function listDebatesForUser(userId: string) {
  return Array.from(debates.values()).filter(d => d.participants.some(p => p.id === userId));
}

export function addArgumentToDebate(debateId: string, arg: any) {
  const d = debates.get(debateId);
  if (!d) return null;
  d.arguments.push(arg);
  d.updatedAt = new Date().toISOString();
  return arg;
}

export function ensureDebateExists(id: string) {
  if (!debates.has(id)) {
    createDebate({ id, title: 'Demo Debate', topic: 'Demo Topic', userId: 'user_demo' });
  }
}

export default {
  createDebate,
  getDebate,
  listDebatesForUser,
  addArgumentToDebate,
  ensureDebateExists,
};

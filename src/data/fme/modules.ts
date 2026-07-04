
export type FmeModule = {
  id: string;
  uuid: string;
  title: string;
  summary: string;
  hours: number;
};

export const fmeModules: FmeModule[] = [
  {
    "id": "p1",
    "uuid": "25b5509e-56fa-4ee3-ad3e-035c4e0eb1de",
    "title": "The Paradigm",
    "summary": "Phase p1 summary",
    "hours": 6
  },
  {
    "id": "p2",
    "uuid": "3f762811-3393-422d-a14e-5ca4533351cd",
    "title": "Harness Engineering",
    "summary": "Phase p2 summary",
    "hours": 8
  },
  {
    "id": "p3",
    "uuid": "024cb95d-a1a1-4a08-a114-36c0612fe4bf",
    "title": "Autonomous Agents",
    "summary": "Phase p3 summary",
    "hours": 12
  },
  {
    "id": "p4",
    "uuid": "001f6d90-f1f9-4694-a837-a3162c7dba41",
    "title": "Spatial and World Models",
    "summary": "Phase p4 summary",
    "hours": 9
  },
  {
    "id": "p5",
    "uuid": "2a1bcb8f-200d-4d2f-aa91-958b39dfae21",
    "title": "Red Teaming",
    "summary": "Phase p5 summary",
    "hours": 10
  },
  {
    "id": "p6",
    "uuid": "8cdc43dc-9d84-415d-ada0-61ca0b86cd61",
    "title": "Enterprise Pipeline",
    "summary": "Phase p6 summary",
    "hours": 6
  }
];

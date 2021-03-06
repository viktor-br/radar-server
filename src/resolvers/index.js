const data = [
  // {key: "me1", position: [52.500419, 13.3822353], content: "Me 1"},
  // {key: "me2", position: [52.507419, 13.3792353], content: "Me 2"},
  // {key: "me3", position: [52.518000, 13.3849000], content: "Me 3"},
  // {key: "me4", position: [52.521000, 13.3819000], content: "Me 4"},
];

const createResolvers = (pubsub) => (
  {
    Query: {
      markers: () => {
        return data;
      }
    },
    Mutation: {
      update(root, {key, position, content}) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            data[i].position[0] = position[0];
            data[i].position[1] = position[1];

            pubsub.publish('updated', { updated: data[i] });

            return data[i];
          }
        }
        const marker = {key, position, content};
        data.push(marker);
        pubsub.publish('updated', { updated: marker });

        return marker;
      },
      remove(root, {key}) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            const removedMarker = data[i];
            data.splice(i, 1);
            pubsub.publish('removed', { removed: removedMarker });

            return removedMarker;
          }
        }

        return null;
      },
    },
    Subscription: {
      updated: {
        subscribe: () => pubsub.asyncIterator('updated')
      },
      removed: {
        subscribe: () => pubsub.asyncIterator('removed')
      }
    },
  }
);

export { createResolvers };

import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway({
    cors:{
        origin: 'http://localhost:3030',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
export class StreamGateway{

    @WebSocketServer()
    server: Server

    @SubscribeMessage('join_room')
    async joinRoom(@MessageBody() roomName: string, @ConnectedSocket() socket: Socket)
    {
        const room = this.server.in(roomName);
        const roomSockets = await room.fetchSockets();
        const numberOfPeopleInRoom = roomSockets.length;

        if(numberOfPeopleInRoom > 1) 
        {
            room.emit('too_many_people')
            return;
        }

        if(numberOfPeopleInRoom === 1)
        {
            room.emit('another_person_ready');
        }

        console.log('client request join :- ', socket.id)
        console.log('roomName :- ', roomName)
        console.log('--------------')
        socket.join(roomName);
    }

    @SubscribeMessage('send_connection_offer')
    handleOffer(@MessageBody() {offer, roomName}: {offer: RTCSessionDescriptionInit, roomName: string}, @ConnectedSocket() socket: Socket) {
        console.log('sending offer')
        this.server.in(roomName).except(socket.id).emit('send_connection_offer', { offer, roomName });
    }

    @SubscribeMessage('answer')
    handleAnswer(@MessageBody() {answer, roomName}: {answer: RTCSessionDescriptionInit, roomName: string}, @ConnectedSocket() socket: Socket) {
        console.log('sending answer to other client')
        this.server.in(roomName).except(socket.id).emit('answer', {answer,roomName});
    }

    @SubscribeMessage('send_candidate')
    handleIceCandidate(@MessageBody() {candidate,roomName}: {candidate: unknown;
      roomName: string;},  @ConnectedSocket() socket: Socket) {
        console.log('hitting ice-candidate')
        this.server.in(roomName).except(socket.id).emit('send_candidate', {candidate, roomName});
    }
}
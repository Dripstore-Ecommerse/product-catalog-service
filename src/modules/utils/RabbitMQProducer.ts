import { logger } from "@dripstore/common/build";
import amqp from "amqplib/callback_api";

class RabbitMQProducer {
  private rabbitmqUrl: string;
  private queue: string;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  constructor(rabbitmqUrl: string, queue: string) {
    this.rabbitmqUrl = rabbitmqUrl;
    this.queue = queue;
    this.connection = null;
    this.channel = null;

    this.connect();
  }

  private connect() {
    amqp.connect(this.rabbitmqUrl, (error, connection) => {
      if (error) {
        logger.error("Failed to connect to RabbitMQ:", error);
        return;
      }

      connection.createChannel((error, channel) => {
        if (error) {
          logger.error("Failed to create channel:", error);
          return;
        }

        channel.assertQueue(this.queue, { durable: false });

        this.connection = connection;
        this.channel = channel;

        logger.info("Connected to RabbitMQ");
      });
    });
  }

  public send(message: string) {
    if (!this.connection || !this.channel) {
      logger.error("Failed to send message: not connected to RabbitMQ");
      return;
    }

    this.channel.sendToQueue(this.queue, Buffer.from(message));
    logger.info(`Sent message "${message}" to queue "${this.queue}"`);
  }

  public close() {
    if (this.channel) {
      this.channel.close(() => console.log("Channel closed"));
      this.channel = null;
    }

    if (this.connection) {
      this.connection.close(() => console.log("Connection closed"));
      this.connection = null;
    }
  }
}

export default RabbitMQProducer;

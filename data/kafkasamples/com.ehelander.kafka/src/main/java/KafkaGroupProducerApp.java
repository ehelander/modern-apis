import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;
import java.util.stream.IntStream;

public class KafkaGroupProducerApp {
  public static void main(String[] args) {
    Properties props = new Properties();
    props.put("bootstrap.servers", "localhost:9092,localhost:9093");
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

    KafkaProducer<String, String> producer = new KafkaProducer<>(props);

    try (producer) {
      String topic = "my-big-topic";
      String value = "abcdefghijklmnopqrstuvwxyz";
      IntStream.range(0, 150)
          .forEachOrdered(
                  i -> {
                ProducerRecord<String, String> record = new ProducerRecord<>(topic, value);
                producer.send(record);
              });
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
